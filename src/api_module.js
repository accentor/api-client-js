const fetchRetry = require("fetch-retry")(fetch, {
  retries: 0,
  retryDelay: function (attempt) {
    return Math.pow(2, attempt) * 15000;
  },
});
export class ApiModule {
  constructor(path) {
    this.path = path;
  }

  async resolveRequest(request) {
    let response, result;
    try {
      response = await fetchRetry(request);
      result = response.status === 204 ? true : await response.json();
    } catch (reason) {
      throw { error: [reason] };
    }
    if (response.ok) {
      return result;
    } else {
      throw result;
    }
  }

  async *indexGenerator(auth) {
    let page = 1;
    while (true) {
      let response;
      try {
        response = await fetchRetry(`${this.path}?page=${page}`, {
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
        if (response.headers.get("x-total-pages") === String(page)) {
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

  async create(auth, object) {
    const request = new Request(`${this.path}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-secret": auth?.secret,
        "x-device-id": auth?.deviceId,
      },
      body: JSON.stringify(object),
    });
    return await this.resolveRequest(request);
  }

  async read(auth, id, retryOptions = {}) {
    const request = new Request(`${this.path}/${id}`, {
      ...retryOptions,
      method: "GET",
      headers: {
        "x-secret": auth.secret,
        "x-device-id": auth.deviceId,
      },
    });
    return await this.resolveRequest(request);
  }

  async update(auth, id, object) {
    const request = new Request(`${this.path}/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "x-secret": auth.secret,
        "x-device-id": auth.deviceId,
      },
      body: JSON.stringify(object),
    });
    return await this.resolveRequest(request);
  }

  async destroy(auth, id) {
    const request = new Request(`${this.path}/${id}`, {
      method: "DELETE",
      headers: {
        "x-secret": auth.secret,
        "x-device-id": auth.deviceId,
      },
    });
    return await this.resolveRequest(request);
  }

  async destroyEmpty(auth) {
    const request = new Request(`${this.path}/destroy_empty`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-secret": auth.secret,
        "x-device-id": auth.device_id,
      },
    });
    return await this.resolveRequest(request);
  }

  async merge(auth, newID, oldID) {
    const request = new Request(`${this.path}/${newID}/merge?old_id=${oldID}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-secret": auth.secret,
        "x-device-id": auth.device_id,
      },
    });
    return await this.resolveRequest(request);
  }
}
