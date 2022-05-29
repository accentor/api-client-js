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
  AuthInterface,
  AuthToken,
  AuthTokenParams,
  AuthTokenWithSecret,
} from "./types/auth";
import { AlbumParams, Album } from "./types/album";
import { RetryOptions } from "./types/fetch_retry";
import { ArtistParams, Artist } from "./types/artist";
import {
  CodecConversion,
  CodecConversionParams,
} from "./types/codec_conversion";
import { Codec, CodecParams } from "./types/codec";
import { CoverFilename, CoverFilenameParams } from "./types/cover_filename";
import { Genre, GenreParams } from "./types/genre";
import { ImageType, ImageTypeParams } from "./types/image_type";
import { Label, LabelParams } from "./types/label";
import { Location, LocationParams } from "./types/location";
import { Play, PlayParams, PlayStat } from "./types/play";
import { Rescan } from "./types/rescan";
import { Track, TrackParams } from "./types/track";
import { User, UserParams } from "./types/user";

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
  index(auth: AuthInterface): AsyncGenerator<ReturnType, ReturnType, void> {
    return indexGenerator<ReturnType, Scope>(this.url, auth, new Scope());
  }

  async create(auth: AuthInterface, object: Params): Promise<ReturnType> {
    return await httpPost<Params, ReturnType>(this.url, auth, object);
  }

  async read(
    auth: AuthInterface,
    id: number,
    retryOptions: RetryOptions = {}
  ): Promise<ReturnType> {
    return await httpGet<ReturnType>(`${this.url}/${id}`, auth, retryOptions);
  }

  async destroy(auth: AuthInterface, id: number | string): Promise<boolean> {
    return await httpDelete(`${this.url}/${id}`, auth);
  }
}

class CRUDModule<Params, ReturnType> extends CRDModule<Params, ReturnType> {
  async update(auth: AuthInterface, id: number, object: Params) {
    return await httpPatch<Params, ReturnType>(
      `${this.url}/${id}`,
      auth,
      object
    );
  }
}

export class AlbumModule extends CRUDModule<AlbumParams, Album> {
  constructor(baseURL: string) {
    super(baseURL, "albums");
  }

  index(
    auth: AuthInterface,
    scope = new AlbumsScope()
  ): AsyncGenerator<Album, Album, void> {
    return indexGenerator<Album, AlbumsScope>(this.url, auth, scope);
  }

  async destroyEmpty(auth: AuthInterface): Promise<boolean> {
    return await httpPost<Record<string, never>, boolean>(
      `${this.url}/destroy_empty`,
      auth,
      {}
    );
  }
}

export class ArtistModule extends CRUDModule<ArtistParams, Artist> {
  constructor(baseURL: string) {
    super(baseURL, "artists");
  }

  index(
    auth: AuthInterface,
    scope = new ArtistsScope()
  ): AsyncGenerator<Artist, Artist, void> {
    return indexGenerator<Artist, ArtistsScope>(this.url, auth, scope);
  }

  async destroyEmpty(auth: AuthInterface): Promise<boolean> {
    return await httpPost<Record<string, never>, boolean>(
      `${this.url}/destroy_empty`,
      auth,
      {}
    );
  }

  async merge(
    auth: AuthInterface,
    id: number | string,
    sourceId: number | string
  ): Promise<Artist> {
    return await httpPost<Record<string, never>, Artist>(
      `${this.url}/${id}/merge?source_id=${sourceId}`,
      auth,
      {}
    );
  }
}

export class AuthTokenModule extends BaseModule {
  constructor(baseURL: string) {
    super(baseURL, "auth_tokens");
  }

  index(auth: AuthInterface): AsyncGenerator<AuthToken, AuthToken, void> {
    return indexGenerator<AuthToken, Scope>(this.url, auth, new Scope());
  }

  async create(object: AuthTokenParams): Promise<AuthTokenWithSecret> {
    return await httpPost(this.url, {} as AuthInterface, object);
  }

  async read(
    auth: AuthInterface,
    id: number,
    retryOptions: RetryOptions = {}
  ): Promise<AuthToken> {
    return await httpGet<AuthToken>(`${this.url}/${id}`, auth, retryOptions);
  }

  async destroy(auth: AuthInterface, id: number | string): Promise<boolean> {
    return await httpDelete(`${this.url}/${id}`, auth);
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

  async destroyEmpty(auth: AuthInterface): Promise<boolean> {
    return await httpPost<Record<string, never>, boolean>(
      `${this.url}/destroy_empty`,
      auth,
      {}
    );
  }

  async merge(
    auth: AuthInterface,
    id: number,
    sourceId: number
  ): Promise<Genre> {
    return await httpPost<Record<string, never>, Genre>(
      `${this.url}/${id}/merge?source_id=${sourceId}`,
      auth,
      {}
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

  async destroyEmpty(auth: AuthInterface): Promise<boolean> {
    return await httpPost<Record<string, never>, boolean>(
      `${this.url}/destroy_empty`,
      auth,
      {}
    );
  }

  async merge(
    auth: AuthInterface,
    id: number,
    sourceId: number
  ): Promise<Label> {
    return await httpPost<Record<string, never>, Label>(
      `${this.url}/${id}/merge?source_id=${sourceId}`,
      auth,
      {}
    );
  }
}

export class LocationModule extends CRDModule<LocationParams, Location> {
  constructor(baseURL: string) {
    super(baseURL, "locations");
  }
}

export class PlayModule extends BaseModule {
  constructor(baseURL: string) {
    super(baseURL, "plays");
  }

  index(
    auth: AuthInterface,
    scope = new PlaysScope()
  ): AsyncGenerator<Play, Play, void> {
    return indexGenerator<Play, PlaysScope>(this.url, auth, scope);
  }

  async create(auth: AuthInterface, object: PlayParams): Promise<Play> {
    return await httpPost<PlayParams, Play>(this.url, auth, object);
  }

  stats(
    auth: AuthInterface,
    scope = new PlaysScope()
  ): AsyncGenerator<PlayStat, PlayStat, void> {
    return indexGenerator<PlayStat, PlaysScope>(
      `${this.url}/stats`,
      auth,
      scope
    );
  }
}

export class RescanModule extends BaseModule {
  constructor(baseURL: string) {
    super(baseURL, "rescans");
  }

  index(auth: AuthInterface): AsyncGenerator<Rescan, Rescan, void> {
    return indexGenerator<Rescan, Scope>(this.url, auth, new Scope());
  }

  async startAll(auth: AuthInterface): Promise<Rescan> {
    return await httpPost<Record<string, never>, Rescan>(this.url, auth, {});
  }

  async start(auth: AuthInterface, id: number): Promise<Rescan> {
    return await httpPost<Record<string, never>, Rescan>(
      `${this.url}/${id}`,
      auth,
      {}
    );
  }

  async show(
    auth: AuthInterface,
    id: number,
    retryOptions: RetryOptions = {}
  ): Promise<Rescan> {
    return await httpGet<Rescan>(`${this.url}/${id}`, auth, retryOptions);
  }
}

export class TrackModule extends CRUDModule<TrackParams, Track> {
  constructor(baseURL: string) {
    super(baseURL, "tracks");
  }

  index(
    auth: AuthInterface,
    scope = new TracksScope()
  ): AsyncGenerator<Track, Track, void> {
    return indexGenerator<Track, TracksScope>(this.url, auth, scope);
  }

  async destroyEmpty(auth: AuthInterface): Promise<boolean> {
    return await httpPost<Record<string, never>, boolean>(
      `${this.url}/destroy_empty`,
      auth,
      {}
    );
  }

  async merge(
    auth: AuthInterface,
    id: number,
    sourceId: number
  ): Promise<Track> {
    return await httpPost<Record<string, never>, Track>(
      `${this.url}/${id}/merge?source_id=${sourceId}`,
      auth,
      {}
    );
  }
}

export class UserModule extends CRUDModule<UserParams, User> {
  constructor(baseURL: string) {
    super(baseURL, "users");
  }
}
