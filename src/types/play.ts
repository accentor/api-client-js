export interface PlayParams {
  play: {
    track_id: number;
    played_at: Date;
  };
}

export type Play = {
  id: number;
  played_at: Date;
  track_id: number;
  user_id: number;
};

export type PlayStat = {
  last_played_at: Date;
  track_id: number;
  user_id: number;
  count: number;
  total_length: number;
};
