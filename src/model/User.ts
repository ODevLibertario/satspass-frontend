export class User {
  email: string;
  username: string;
  lightningAddress: string;

  constructor(email: string, username: string, lightningAddress: string) {
    this.email = email;
    this.username = username;
    this.lightningAddress = lightningAddress;
  }
}
