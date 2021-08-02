import { Timestamps } from "./shared";

export type Track = Timestamps & {
  id: number;
  title: string;
  normalized_title: string;
  number: number;
  album_id: number;
  review_comment?: string;
  genre_ids: number[];
  codec_id?: number;
  length?: number;
  bitrate?: number;
  location_id?: number;
  track_artists: TrackArtist[];
  filename?: string;
  sample_rate?: number;
  bit_depth?: number;
};

type TrackArtistParams = {
  artist_id: number;
  name: string;
  role: TrackArtistRole;
  order: number;
};

type TrackArtist = TrackArtistParams & {
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
    review_comment?: string;
    genre_ids: number[];
    track_artists: TrackArtistParams[];
  };
}
