export interface GenreParams {
  genre: {
    name: string;
  };
}

export type Genre = {
  id: number;
  name: string;
  normalized_name: string;
};
