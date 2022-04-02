import { Timestamps } from "./shared";

export const enum PlaylistType {
  ALBUM = "album",
  ARTIST = "artist",
  TRACK = "track",
}

export interface PlaylistParams {
  playlist: {
    name: string;
    description?: string;
    personal?: boolean;
    private?: boolean;
    playlist_type: PlaylistType;
    item_ids: [];
  };
}

export type Playlist = Timestamps & {
  name: string;
  description: string | null;
  user_id: number | null;
  private: boolean;
  playlist_type: PlaylistType;
  item_ids: number[];
};
