import { Timestamps } from "./shared";

export const enum PlaylistType {
  ALBUM = "album",
  ARTIST = "artist",
  TRACK = "track",
}

export const enum PlaylistAccess {
  SHARED = "shared",
  PERSONAL = "personal",
  SECRET = "secret",
}

export interface PlaylistParams {
  playlist: {
    name: string;
    description?: string;
    access?: PlaylistAccess;
    playlist_type: PlaylistType;
    item_ids: [];
  };
}

export interface PlaylistItemParams {
  playlist: {
    item_id: number;
    item_type: "Album" | "Artist" | "Track";
  };
}

export type Playlist = Timestamps & {
  id: number;
  name: string;
  description: string | null;
  user_id: number;
  access: PlaylistAccess;
  playlist_type: PlaylistType;
  item_ids: number[];
};
