export type Timestamps = {
  created_at: Date;
  updated_at: Date;
};

export type Image = {
  image?: string;
  image100?: string;
  image250?: string;
  image500?: string;
  image_type: string;
};

export type ImageParams = {
  data: string;
  filename: string;
  mimetype: string;
};
