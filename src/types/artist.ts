import { Image, ImageParams, Timestamps } from "./shared";

export interface ArtistParams {
  artist: {
    name: string;
    review_comment?: string;
    image?: ImageParams;
  };
}

export type Artist = Timestamps &
  Image & {
    id: number;
    name: string;
    normalized_name: string;
    review_comment?: string;
  };
