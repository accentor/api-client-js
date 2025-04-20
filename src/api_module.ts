import {
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  indexGenerator,
} from "./http";
import {
  AlbumsScope,
  ArtistsScope,
  PlaysScope,
  Scope,
  TracksScope,
} from "./scopes";
import {
  Album,
  AlbumParams,
  ApiToken,
  Artist,
  ArtistParams,
  AuthToken,
  AuthTokenParams,
  AuthTokenWithToken,
  Codec,
  CodecConversion,
  CodecConversionParams,
  CodecParams,
  CoverFilename,
  CoverFilenameParams,
  Genre,
  GenreParams,
  ImageType,
  ImageTypeParams,
  Label,
  LabelParams,
  Location,
  LocationParams,
  Play,
  Playlist,
  PlaylistItemParams,
  PlaylistParams,
  PlayParams,
  PlayStat,
  Rescan,
  RetryOptions,
  Track,
  TrackParams,
  User,
  UserParams,
} from "./types";

class BaseModule {
  path: string;
  baseURL: string;

  constructor(baseURL: string, path: string) {
    this.path = path;
    this.baseURL = baseURL;
  }

  get url(): string {
    return `${this.baseURL}/${this.path}`;
  }
}

class CRDModule<Params, ReturnType> extends BaseModule {
  index(apiToken: ApiToken): AsyncGenerator<ReturnType[], ReturnType[], void> {
    return indexGenerator<ReturnType, Scope>(this.url, apiToken, new Scope());
  }

  async create(apiToken: ApiToken, object: Params): Promise<ReturnType> {
    return await httpPost<Params, ReturnType>(this.url, apiToken, object);
  }

  async read(
    apiToken: ApiToken,
    id: number,
    retryOptions: RetryOptions = {},
  ): Promise<ReturnType> {
    return await httpGet<ReturnType>(
      `${this.url}/${id}`,
      apiToken,
      retryOptions,
    );
  }

  async destroy(apiToken: ApiToken, id: number | string): Promise<boolean> {
    return await httpDelete(`${this.url}/${id}`, apiToken);
  }
}

class CRUDModule<Params, ReturnType> extends CRDModule<Params, ReturnType> {
  async update(apiToken: ApiToken, id: number, object: Params) {
    return await httpPatch<Params, ReturnType>(
      `${this.url}/${id}`,
      apiToken,
      object,
    );
  }
}

export class AlbumModule extends CRUDModule<AlbumParams, Album> {
  constructor(baseURL: string) {
    super(baseURL, "albums");
  }

  index(
    apiToken: ApiToken,
    scope = new AlbumsScope(),
  ): AsyncGenerator<Album[], Album[], void> {
    return indexGenerator<Album, AlbumsScope>(this.url, apiToken, scope);
  }

  async destroyEmpty(apiToken: ApiToken): Promise<boolean> {
    return await httpPost<Record<string, never>, boolean>(
      `${this.url}/destroy_empty`,
      apiToken,
      {},
    );
  }

  async merge(
    apiToken: ApiToken,
    id: number | string,
    sourceId: number | string,
  ): Promise<Album> {
    return await httpPost<Record<string, never>, Album>(
      `${this.url}/${id}/merge?source_id=${sourceId}`,
      apiToken,
      {},
    );
  }
}

export class ArtistModule extends CRUDModule<ArtistParams, Artist> {
  constructor(baseURL: string) {
    super(baseURL, "artists");
  }

  index(
    apiToken: ApiToken,
    scope = new ArtistsScope(),
  ): AsyncGenerator<Artist[], Artist[], void> {
    return indexGenerator<Artist, ArtistsScope>(this.url, apiToken, scope);
  }

  async destroyEmpty(apiToken: ApiToken): Promise<boolean> {
    return await httpPost<Record<string, never>, boolean>(
      `${this.url}/destroy_empty`,
      apiToken,
      {},
    );
  }

  async merge(
    apiToken: ApiToken,
    id: number | string,
    sourceId: number | string,
  ): Promise<Artist> {
    return await httpPost<Record<string, never>, Artist>(
      `${this.url}/${id}/merge?source_id=${sourceId}`,
      apiToken,
      {},
    );
  }
}

export class AuthTokenModule extends BaseModule {
  constructor(baseURL: string) {
    super(baseURL, "auth_tokens");
  }

  index(apiToken: ApiToken): AsyncGenerator<AuthToken[], AuthToken[], void> {
    return indexGenerator<AuthToken, Scope>(this.url, apiToken, new Scope());
  }

  async create(object: AuthTokenParams): Promise<AuthTokenWithToken> {
    return await httpPost(this.url, "", object);
  }

  async read(
    apiToken: ApiToken,
    id: number,
    retryOptions: RetryOptions = {},
  ): Promise<AuthToken> {
    return await httpGet<AuthToken>(
      `${this.url}/${id}`,
      apiToken,
      retryOptions,
    );
  }

  async destroy(apiToken: ApiToken, id: number | string): Promise<boolean> {
    return await httpDelete(`${this.url}/${id}`, apiToken);
  }
}

export class CodecConversionModule extends CRUDModule<
  CodecConversionParams,
  CodecConversion
> {
  constructor(baseURL: string) {
    super(baseURL, "codec_conversions");
  }
}

export class CodecModule extends CRUDModule<CodecParams, Codec> {
  constructor(baseURL: string) {
    super(baseURL, "codecs");
  }
}

export class CoverFilenameModule extends CRUDModule<
  CoverFilenameParams,
  CoverFilename
> {
  constructor(baseURL: string) {
    super(baseURL, "cover_filenames");
  }
}

export class GenreModule extends CRUDModule<GenreParams, Genre> {
  constructor(baseURL: string) {
    super(baseURL, "genres");
  }

  async destroyEmpty(apiToken: ApiToken): Promise<boolean> {
    return await httpPost<Record<string, never>, boolean>(
      `${this.url}/destroy_empty`,
      apiToken,
      {},
    );
  }

  async merge(
    apiToken: ApiToken,
    id: number,
    sourceId: number,
  ): Promise<Genre> {
    return await httpPost<Record<string, never>, Genre>(
      `${this.url}/${id}/merge?source_id=${sourceId}`,
      apiToken,
      {},
    );
  }
}

export class ImageTypeModule extends CRUDModule<ImageTypeParams, ImageType> {
  constructor(baseURL: string) {
    super(baseURL, "image_types");
  }
}

export class LabelModule extends CRUDModule<LabelParams, Label> {
  constructor(baseURL: string) {
    super(baseURL, "labels");
  }

  async destroyEmpty(apiToken: ApiToken): Promise<boolean> {
    return await httpPost<Record<string, never>, boolean>(
      `${this.url}/destroy_empty`,
      apiToken,
      {},
    );
  }

  async merge(
    apiToken: ApiToken,
    id: number,
    sourceId: number,
  ): Promise<Label> {
    return await httpPost<Record<string, never>, Label>(
      `${this.url}/${id}/merge?source_id=${sourceId}`,
      apiToken,
      {},
    );
  }
}

export class LocationModule extends CRDModule<LocationParams, Location> {
  constructor(baseURL: string) {
    super(baseURL, "locations");
  }
}

export class PlaylistModule extends CRUDModule<PlaylistParams, Playlist> {
  constructor(baseURL: string) {
    super(baseURL, "playlists");
  }

  async addItem(
    apiToken: ApiToken,
    id: number,
    object: PlaylistItemParams,
  ): Promise<null> {
    return await httpPost(`${this.url}/${id}/add_item`, apiToken, object);
  }
}

export class PlayModule extends BaseModule {
  constructor(baseURL: string) {
    super(baseURL, "plays");
  }

  index(
    apiToken: ApiToken,
    scope = new PlaysScope(),
  ): AsyncGenerator<Play[], Play[], void> {
    return indexGenerator<Play, PlaysScope>(this.url, apiToken, scope);
  }

  async create(apiToken: ApiToken, object: PlayParams): Promise<Play> {
    return await httpPost<PlayParams, Play>(this.url, apiToken, object);
  }

  stats(
    apiToken: ApiToken,
    scope = new PlaysScope(),
  ): AsyncGenerator<PlayStat[], PlayStat[], void> {
    return indexGenerator<PlayStat, PlaysScope>(
      `${this.url}/stats`,
      apiToken,
      scope,
    );
  }
}

export class RescanModule extends BaseModule {
  constructor(baseURL: string) {
    super(baseURL, "rescans");
  }

  index(apiToken: ApiToken): AsyncGenerator<Rescan[], Rescan[], void> {
    return indexGenerator<Rescan, Scope>(this.url, apiToken, new Scope());
  }

  async startAll(apiToken: ApiToken): Promise<Rescan> {
    return await httpPost<Record<string, never>, Rescan>(
      this.url,
      apiToken,
      {},
    );
  }

  async start(apiToken: ApiToken, id: number): Promise<Rescan> {
    return await httpPost<Record<string, never>, Rescan>(
      `${this.url}/${id}`,
      apiToken,
      {},
    );
  }

  async show(
    apiToken: ApiToken,
    id: number,
    retryOptions: RetryOptions = {},
  ): Promise<Rescan> {
    return await httpGet<Rescan>(`${this.url}/${id}`, apiToken, retryOptions);
  }
}

export class TrackModule extends CRUDModule<TrackParams, Track> {
  constructor(baseURL: string) {
    super(baseURL, "tracks");
  }

  index(
    apiToken: ApiToken,
    scope = new TracksScope(),
  ): AsyncGenerator<Track[], Track[], void> {
    return indexGenerator<Track, TracksScope>(this.url, apiToken, scope);
  }

  async destroyEmpty(apiToken: ApiToken): Promise<boolean> {
    return await httpPost<Record<string, never>, boolean>(
      `${this.url}/destroy_empty`,
      apiToken,
      {},
    );
  }

  async merge(
    apiToken: ApiToken,
    id: number,
    sourceId: number,
  ): Promise<Track> {
    return await httpPost<Record<string, never>, Track>(
      `${this.url}/${id}/merge?source_id=${sourceId}`,
      apiToken,
      {},
    );
  }
}

export class UserModule extends CRUDModule<UserParams, User> {
  constructor(baseURL: string) {
    super(baseURL, "users");
  }
}
