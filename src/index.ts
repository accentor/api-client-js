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
  PlaylistModule,
  PlayModule,
  RescanModule,
  TrackModule,
  UserModule,
} from "./api_module";
export * from "./api_module";
export * from "./scopes";

export function createApiClient(baseURL: string): {
  albums: AlbumModule;
  artists: ArtistModule;
  auth_tokens: AuthTokenModule;
  codec_conversions: CodecConversionModule;
  codecs: CodecModule;
  cover_filenames: CoverFilenameModule;
  genres: GenreModule;
  image_types: ImageTypeModule;
  labels: LabelModule;
  locations: LocationModule;
  playlists: PlaylistModule;
  plays: PlayModule;
  rescans: RescanModule;
  tracks: TrackModule;
  users: UserModule;
} {
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
    playlists: new PlaylistModule(baseURL),
    plays: new PlayModule(baseURL),
    rescans: new RescanModule(baseURL),
    tracks: new TrackModule(baseURL),
    users: new UserModule(baseURL),
  };
}
