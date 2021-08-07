export interface CodecConversionParams {
  codec_conversion: {
    name: string;
    ffmpeg_params: string;
    resulting_codec_id: number;
  };
}

export type CodecConversion = {
  id: number;
  name: string;
  ffmpeg_params: string;
  resulting_codec_id: number;
};
