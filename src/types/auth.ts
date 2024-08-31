export interface AuthInterface {
  secret: string;
  device_id: string;
}

export type AuthToken = {
  id: number;
  device_id: string;
  user_id: number;
  user_agent: string;
  application?: string;
};

export type AuthTokenWithSecret = AuthToken & {
  secret: string;
};

export interface AuthTokenParams {
  name: string;
  password: string;
  auth_token?: {
    user_agent?: string;
    application?: string;
  };
}
