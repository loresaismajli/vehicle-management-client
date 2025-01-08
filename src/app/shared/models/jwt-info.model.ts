export interface JwtInfo {
  accessToken: string;
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  roleId: string;
  role: string;
  exp: number;
}
