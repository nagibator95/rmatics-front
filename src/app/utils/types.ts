export interface ApiResponse<T> {
  status_code: number;
  data: T;
  status: string;
  error?: string;
}
