export class ApiError {
  status: number;
  message: string = "Something went wrong";
  success: boolean;

  constructor(
    status: number,
    success: boolean,
    message = "Something went wrong"
  ) {
    this.status = status;
    this.message = message;
    this.success = success;
  }
}
