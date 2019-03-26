export interface FormattedApiResponse {
  state: {
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    refreshToken: string;
  } | undefined;
  statusCode: number;
  status: string;
  error: string;
}
