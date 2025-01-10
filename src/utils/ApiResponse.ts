export class ApiResponse {
  status: number;
  message: string;
  success: boolean;
  data?: unknown;
  constructor(
    status: number,
    success: boolean,
    data: unknown,
    message = "Success"
  ) {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = success;
  }
}
