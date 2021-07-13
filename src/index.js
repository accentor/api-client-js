import { ApiModule } from "./api_module";
export * from "./scopes";

export function createApiClient(baseURL) {
  return {
    albums: new ApiModule(`${baseURL}/albums`, [
      "index",
      "create",
      "read",
      "update",
      "destroy",
      "destroyEmpty",
    ]),
    artists: new ApiModule(`${baseURL}/artists`, [
      "index",
      "create",
      "read",
      "update",
      "destroy",
      "destroyEmpty",
      "merge",
    ]),
    auth: new ApiModule(`${baseURL}/auth_tokens`, [
      "index",
      "create",
      "read",
      "destroy",
    ]),
    codec_conversion: new ApiModule(`${baseURL}/codec_conversions`, [
      "index",
      "create",
      "read",
      "update",
      "destroy",
    ]),
    codecs: new ApiModule(`${baseURL}/codecs`, [
      "index",
      "create",
      "read",
      "update",
      "destroy",
    ]),
    cover_filenames: new ApiModule(`${baseURL}/cover_filenames`, [
      "index",
      "create",
      "read",
      "destroy",
    ]),
    genres: new ApiModule(`${baseURL}/genres`, [
      "index",
      "create",
      "read",
      "update",
      "destroy",
      "destroyEmpty",
      "merge",
    ]),
    image_types: new ApiModule(`${baseURL}/image_types`, [
      "index",
      "create",
      "read",
      "update",
      "destroy",
    ]),
    labels: new ApiModule(`${baseURL}/labels`, [
      "index",
      "create",
      "read",
      "update",
      "destroy",
      "destroyEmpty",
      "merge",
    ]),
    locations: new ApiModule(`${baseURL}/locations`, [
      "index",
      "create",
      "read",
      "destroy",
    ]),
    plays: new ApiModule(`${baseURL}/plays`, ["index", "create"]),
    rescan: new ApiModule(`${baseURL}/rescan`, ["create", "read"]),
    tracks: new ApiModule(`${baseURL}/tracks`, [
      "index",
      "create",
      "read",
      "update",
      "destroy",
      "destroyEmpty",
      "merge",
    ]),
    users: new ApiModule(`${baseURL}/users`, [
      "index",
      "create",
      "read",
      "update",
      "destroy",
    ]),
  };
}
