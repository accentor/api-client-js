import { ApiModule } from "./api_module";

export default function createApiClient(baseURL) {
  return {
    albums: new ApiModule(`${baseURL}/albums`),
    artists: new ApiModule(`${baseURL}/artists`),
    auth: new ApiModule(`${baseURL}/auth_tokens`),
    codec_conversion: new ApiModule(`${baseURL}/codec_conversions`),
    codecs: new ApiModule(`${baseURL}/codecs`),
    cover_filenames: new ApiModule(`${baseURL}/cover_filenames`),
    genres: new ApiModule(`${baseURL}/genres`),
    image_types: new ApiModule(`${baseURL}/image_types`),
    labels: new ApiModule(`${baseURL}/labels`),
    locations: new ApiModule(`${baseURL}/locations`),
    rescan: new ApiModule(`${baseURL}/rescan`),
    tracks: new ApiModule(`${baseURL}/tracks`),
    users: new ApiModule(`${baseURL}/users`),
  };
}
