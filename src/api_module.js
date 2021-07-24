import { Scope } from "./scopes";
import useFetchRetry from "fetch-retry";

const fetchRetry = useFetchRetry(fetch, {
  retries: 0,
  retryDelay: function (attempt) {
    return Math.pow(2, attempt) * 15000;
  },
});

export class ApiModule {
  constructor(path, routes) {
    this.path = path;

    if (routes.includes("index")) {
      this.indexGenerator = function (auth) {
        return this._internalIndexGenerator(auth, new Scope());
      };
    }

    if (routes.includes("create")) {
      this.create = async function (auth, object) {
        const request = new Request(`${this.path}`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-secret": auth?.secret,
            "x-device-id": auth?.device_id,
          },
          body: JSON.stringify(object),
        });
        return await this._resolveRequest(request);
      };
    }

    if (routes.includes("read")) {
      this.read = async function (auth, id, retryOptions = {}) {
        const request = new Request(`${this.path}/${id}`, {
          ...retryOptions,
          method: "GET",
          headers: {
            "x-secret": auth.secret,
            "x-device-id": auth.device_id,
          },
        });
        return await this._resolveRequest(request);
      };
    }

    if (routes.includes("update")) {
      this.update = async function (auth, id, object) {
        const request = new Request(`${this.path}/${id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            "x-secret": auth.secret,
            "x-device-id": auth.device_id,
          },
          body: JSON.stringify(object),
        });
        return await this._resolveRequest(request);
      };
    }

    if (routes.includes("destroy")) {
      this.destroy = async function (auth, id) {
        const request = new Request(`${this.path}/${id}`, {
          method: "DELETE",
          headers: {
            "x-secret": auth.secret,
            "x-device-id": auth.device_id,
          },
        });
        return await this._resolveRequest(request);
      };
    }

    if (routes.includes("destroyEmpty")) {
      this.destroyEmpty = async function (auth) {
        const request = new Request(`${this.path}/destroy_empty`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-secret": auth.secret,
            "x-device-id": auth.device_id,
          },
        });
        return await this._resolveRequest(request);
      };
    }

    if (routes.includes("merge")) {
      this.merge = async function (auth, newID, oldID) {
        const request = new Request(
          `${this.path}/${newID}/merge?source_id=${oldID}`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "x-secret": auth.secret,
              "x-device-id": auth.device_id,
            },
          }
        );
        return await this._resolveRequest(request);
      };
    }
  }

  async _resolveRequest(request) {
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

  async *_internalIndexGenerator(auth, scope) {
    let page = 1;
    while (true) {
      let response;
      try {
        response = await fetchRetry(
          `${this.path}?page=${page}${scope.finalQuery}`,
          {
            retries: 5,
            method: "GET",
            headers: {
              "x-secret": auth.secret,
              "x-device-id": auth.device_id,
            },
          }
        );
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
}

export class RescanModule extends ApiModule {
  constructor(path) {
    super(path, []);
  }

  start = async function (auth, object) {
    const request = new Request(`${this.path}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-secret": auth.secret,
        "x-device-id": auth.device_id,
      },
      body: JSON.stringify(object),
    });
    return await this._resolveRequest(request);
  };

  show = async function (auth, retryOptions = {}) {
    const request = new Request(`${this.path}`, {
      ...retryOptions,
      method: "GET",
      headers: {
        "x-secret": auth.secret,
        "x-device-id": auth.device_id,
      },
    });
    return await this._resolveRequest(request);
  };
}

export class ApiModuleWithScope extends ApiModule {
  constructor(path, routes) {
    super(
      path,
      routes.filter((r) => r !== "index")
    );

    if (routes.includes("index")) {
      this.indexGenerator = function (auth, scope = new Scope()) {
        return this._internalIndexGenerator(auth, scope);
      };
    }
  }
}
