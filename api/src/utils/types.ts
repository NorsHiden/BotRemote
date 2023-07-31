export type user = {
  id: string;
  access_token: string;
  refresh_token: string;
  playlist: string[];
};

export type JwtPayload = {
  sub: string;
};
