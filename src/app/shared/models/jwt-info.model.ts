export interface JwtInfo {
  accessToken: string;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  roleId: string;
  role: string;
  exp: number;
}
