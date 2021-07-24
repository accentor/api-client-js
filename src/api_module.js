import { AlbumsScope, ArtistsScope, Scope, TracksScope } from "./scopes";
import useFetchRetry from "fetch-retry";

const fetchRetry = useFetchRetry(fetch, {
  retries: 0,
  retryDelay: function (attempt) {
    return Math.pow(2, attempt) * 15000;
  },
});

async function* indexGenerator(path, auth, scope) {
  let page = 1;
  while (true) {
    let response;
    try {
      response = await fetchRetry(`${path}?page=${page}${scope.finalQuery}`, {
        retries: 5,
        method: "GET",
        headers: {
          "x-secret": auth.secret,
          "x-device-id": auth.device_id,
        },
      });
    } catch (error) {
      const reason = {};
      reason[error.constructor.name] = [error.message];
      throw reason;
    }
    const result = await response.json();
    const loaded = new Date();
    for (let obj in result) {
      result[obj].loaded = loaded;
    }
    if (response.ok && result) {
      if (response.headers.get("x-total-pages") === page.toString()) {
        return result;
      } else {
        yield result;
      }
    } else {
      throw result;
    }

    page++;
  }
}

async function httpGet(path, auth, retryOptions) {
  const request = new Request(path, {
    ...retryOptions,
    method: "GET",
    headers: {
      "x-secret": auth.secret,
      "x-device-id": auth.device_id,
    },
  });
  return await resolve(request);
}

async function httpPost(path, auth, data) {
  const request = new Request(path, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-secret": auth.secret,
      "x-device-id": auth.device_id,
    },
    body: JSON.stringify(data),
  });
  return await resolve(request);
}

async function httpPatch(path, auth, data) {
  const request = new Request(path, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "x-secret": auth.secret,
      "x-device-id": auth.device_id,
    },
    body: JSON.stringify(data),
  });
  return await resolve(request);
}

async function httpDelete(path, auth) {
  const request = new Request(path, {
    method: "DELETE",
    headers: {
      "x-secret": auth.secret,
      "x-device-id": auth.device_id,
    },
  });
  return await resolve(request);
}

async function resolve(request) {
  let response, result;
  try {
    response = await fetchRetry(request);
    result = response.status === 204 ? true : await response.json();
  } catch (error) {
    const reason = {};
    reason[error.constructor.name] = [error.message];
    throw reason;
  }
  if (response.ok) {
    return result;
  } else {
    throw result;
  }
}

class CRDModule {
  constructor(path) {
    this.path = path;
  }

  index(auth) {
    return indexGenerator(this.path, auth, new Scope());
  }

  async create(auth, object) {
    return await httpPost(this.path, auth, object);
  }

  async read(auth, id, retryOptions = {}) {
    return await httpGet(`${this.path}/${id}`, auth, retryOptions);
  }

  async destroy(auth, id) {
    return await httpDelete(`${this.path}/${id}`, auth);
  }
}

class CRUDModule extends CRDModule {
  constructor(path) {
    super(path);
  }

  async update(auth, id, object) {
    return await httpPatch(`${this.path}/${id}`, auth, object);
  }
}

export class AlbumModule extends CRUDModule {
  constructor(baseURL) {
    super(`${baseURL}/albums`);
  }

  index(auth, scope = new AlbumsScope()) {
    return indexGenerator(this.path, auth, scope);
  }

  async destroyEmpty(auth) {
    return await httpPost(`${this.path}/destroy_empty`, auth, {});
  }
}

export class ArtistModule extends CRUDModule {
  constructor(baseURL) {
    super(`${baseURL}/artists`);
  }

  index(auth, scope = new ArtistsScope()) {
    return indexGenerator(this.path, auth, scope);
  }

  async destroyEmpty(auth) {
    return await httpPost(`${this.path}/destroy_empty`, auth, {});
  }

  async merge(auth, id, sourceId) {
    return await httpPost(
      `{this.path}/${id}/merge?source_id=${sourceId}`,
      auth,
      {}
    );
  }
}

export class AuthTokenModule extends CRDModule {
  constructor(baseURL) {
    super(`${baseURL}/auth_tokens`);
  }

  async create(object) {
    return await httpPost(this.path, {}, object);
  }
}

export class CodecConversionModule extends CRUDModule {
  constructor(baseURL) {
    super(`${baseURL}/codec_conversions`);
  }
}

export class CodecModule extends CRUDModule {
  constructor(baseURL) {
    super(`${baseURL}/codecs`);
  }
}

export class CoverFilenameModule extends CRUDModule {
  constructor(baseURL) {
    super(`${baseURL}/cover_filenames`);
  }
}

export class GenreModule extends CRUDModule {
  constructor(baseURL) {
    super(`${baseURL}/genres`);
  }

  async destroyEmpty(auth) {
    return await httpPost(`${this.path}/destroy_empty`, auth, {});
  }

  async merge(auth, id, sourceId) {
    return await httpPost(
      `{this.path}/${id}/merge?source_id=${sourceId}`,
      auth,
      {}
    );
  }
}

export class ImageTypeModule extends CRUDModule {
  constructor(baseURL) {
    super(`${baseURL}/image_types`);
  }
}

export class LabelModule extends CRUDModule {
  constructor(baseURL) {
    super(`${baseURL}/labels`);
  }

  async destroyEmpty(auth) {
    return await httpPost(`${this.path}/destroy_empty`, auth, {});
  }

  async merge(auth, id, sourceId) {
    return await httpPost(
      `{this.path}/${id}/merge?source_id=${sourceId}`,
      auth,
      {}
    );
  }
}

export class LocationModule extends CRDModule {
  constructor(baseURL) {
    super(`${baseURL}/locations`);
  }
}

export class PlayModule {
  constructor(baseURL) {
    this.path = `${baseURL}/plays`;
  }

  index(auth) {
    return indexGenerator(this.path, auth, new Scope());
  }

  async create(auth, object) {
    return await httpPost(this.path, auth, object);
  }
}

export class RescanModule {
  constructor(baseURL) {
    this.path = `${baseURL}/rescan`;
  }

  async start(auth) {
    return await httpPost(this.path, auth, {});
  }

  async show(auth, retryOptions = {}) {
    return await httpGet(this.path, auth, retryOptions);
  }
}

export class TrackModule extends CRUDModule {
  constructor(baseURL) {
    super(`${baseURL}/tracks`);
  }

  index(auth, scope = new TracksScope()) {
    return indexGenerator(this.path, auth, scope);
  }

  async destroyEmpty(auth) {
    return await httpPost(`${this.path}/destroy_empty`, auth, {});
  }

  async merge(auth, id, sourceId) {
    return await httpPost(
      `{this.path}/${id}/merge?source_id=${sourceId}`,
      auth,
      {}
    );
  }
}

export class UserModule extends CRUDModule {
  constructor(baseURL) {
    super(`${baseURL}/users`);
  }
}
