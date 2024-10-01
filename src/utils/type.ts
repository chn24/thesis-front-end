export enum USER_ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
}
export type User = {
  email: string;
  role: USER_ROLE;
  stakeAmount: number;
};
