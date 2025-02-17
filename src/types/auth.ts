export type ApiToken = string;

export type AuthToken = {
  id: number;
  user_id: number;
  user_agent: string;
  application?: string;
};

export type AuthTokenWithToken = AuthToken & {
  token: ApiToken;
};

export interface AuthTokenParams {
  name: string;
  password: string;
  auth_token?: {
    user_agent?: string;
    application?: string;
  };
}
