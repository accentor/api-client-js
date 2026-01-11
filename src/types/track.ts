import { Timestamps } from "./shared";

export type Track = Timestamps & {
  id: number;
  title: string;
  normalized_title: string;
  number: number;
  album_id: number;
  review_comment: string | null;
  genre_ids: number[];
  codec_id: number | null;
  length: number | null;
  bitrate: number | null;
  location_id: number | null;
  audio_file_id: number | null;
  track_artists: TrackArtist[];
  filename: string | null;
  sample_rate: number | null;
  bit_depth: number | null;
};

export type TrackArtistParams = {
  artist_id: number;
  name: string;
  role: TrackArtistRole;
  order: number;
  hidden: boolean;
};

export type TrackArtist = TrackArtistParams & {
  normalized_name: string;
};

export enum TrackArtistRole {
  main = "main",
  performer = "performer",
  composer = "composer",
  conductor = "conductor",
  remixer = "remixer",
  producer = "producer",
  arranger = "arranger",
}

export interface TrackParams {
  track: {
    title: string;
    number: number;
    album_id: number;
    review_comment?: string | null;
    genre_ids: number[];
    track_artists: TrackArtistParams[];
  };
}
