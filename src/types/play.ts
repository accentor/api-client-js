export interface PlayParams {
  play: {
    track_id: number;
    played_at: string;
  };
}

export type Play = {
  id: number;
  played_at: string;
  track_id: number;
  user_id: number;
};

export type PlayStat = {
  last_played_at: string;
  track_id: number;
  user_id: number;
  count: number;
  total_length: number;
};
