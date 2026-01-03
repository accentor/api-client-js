export * from "./album";
export * from "./artist";
export * from "./auth";
export * from "./codec";
export * from "./codec_conversion";
export * from "./cover_filename";
export * from "./fetch_retry";
export * from "./genre";
export * from "./image_type";
export * from "./label";
export * from "./location";
export * from "./play";
export * from "./playlist";
export * from "./rescan";
export * from "./shared";
export * from "./track";
export * from "./user";

export type UpdateParams<T> = {
  [P in keyof T]: Partial<T[P]>;
};
