export type Rescan = {
  error_text: string | null;
  warning_text: string | null;
  processed: number;
  running: boolean;
  finished_at: Date;
};
