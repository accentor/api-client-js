import { Image, ImageParams, Timestamps } from "./shared";

export interface AlbumParams {
  album: {
    title: string;
    release: Date;
    review_comment?: string;
    edition?: Date;
    edition_description?: string;
    image?: ImageParams;
    album_artists: AlbumArtistParams[];
    album_labels: AlbumLabel[];
  };
}

export type Album = Timestamps &
  Image & {
    id: number;
    title: string;
    normalized_title: string;
    release: Date;
    review_comment: string | null;
    edition: Date | null;
    edition_description: string | null;
    album_artists: AlbumArtist[];
    album_labels: AlbumLabel[];
  };

export type AlbumArtistParams = {
  artist_id: number;
  name: string;
  order: number;
  separator?: string;
};

export type AlbumArtist = AlbumArtistParams & {
  normalized_name: string;
  separator: string | null;
};

export type AlbumLabel = {
  label_id: number;
  catalogue_number: string | null;
};
