export class SignUpRequest {
  private email: string;
  private username: string | undefined;
  private password: string;

  constructor(email: string, username: string | undefined, password: string) {
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
