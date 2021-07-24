import {
  AlbumModule,
  ArtistModule,
  AuthTokenModule,
  CodecConversionModule,
  CodecModule,
  CoverFilenameModule,
  GenreModule,
  ImageTypeModule,
  LabelModule,
  LocationModule,
  PlayModule,
  RescanModule,
  TrackModule,
  UserModule,
} from "./api_module";
export * from "./api_module";
export * from "./scopes";

export function createApiClient(baseURL) {
  return {
    albums: new AlbumModule(baseURL),
    artists: new ArtistModule(baseURL),
    auth_tokens: new AuthTokenModule(baseURL),
    codec_conversions: new CodecConversionModule(baseURL),
    codecs: new CodecModule(baseURL),
    cover_filenames: new CoverFilenameModule(baseURL),
    genres: new GenreModule(baseURL),
    image_types: new ImageTypeModule(baseURL),
    labels: new LabelModule(baseURL),
    locations: new LocationModule(baseURL),
    plays: new PlayModule(baseURL),
    rescan: new RescanModule(baseURL),
    tracks: new TrackModule(baseURL),
    users: new UserModule(baseURL),
  };
}
