export class MessageDto {
  constructor(
    user: string,
    text: string
  ) {
    this.user = user;
    this.text = text;
  }

  user : string;
  text : string;
}
