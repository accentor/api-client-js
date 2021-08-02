export type Codec = {
  id: number;
  mimetype: string;
  extension: string;
};

export interface CodecParams {
  codec: {
    mimetype: string;
    extension: string;
  };
}
