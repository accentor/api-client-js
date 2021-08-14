export type Timestamps = {
  created_at: Date;
  updated_at: Date;
};

export type Image = {
  image: string | null;
  image100: string | null;
  image250: string | null;
  image500: string | null;
  image_type: string | null;
};

export type ImageParams = {
  data: string | null;
  filename?: string;
  mimetype?: string;
};
