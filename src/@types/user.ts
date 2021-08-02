export interface UserParams {
  user: {
    name: string;
    password: string;
    password_confirmation: string;
    permission?: UserPermission;
  };
}

export enum UserPermission {
  user = "user",
  moderator = "moderator",
  admin = "admin",
}

export type User = {
  id: number;
  name: string;
  permission: UserPermission;
};
