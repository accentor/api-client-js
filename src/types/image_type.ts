export interface ImageTypeParams {
  image_type: {
    mimetype: string;
    extension: string;
  };
}

export type ImageType = {
  id: number;
  mimetype: string;
  extension: string;
};
