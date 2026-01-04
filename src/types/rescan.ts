export type Rescan = {
  id: number;
  error_text: string | null;
  warning_text: string | null;
  processed: number;
  running: boolean;
  finished_at: string;
  location_id: number;
};
