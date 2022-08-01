export interface Indexable {
  id?: number,
}

export interface User extends Indexable {
  username: string,
  classe: string,
  level: number,
  password: string
}

export interface Credentials {
  username: string,
  password: string
}

export class CustomError extends Error {
  name: string;

  constructor(name: string, message: string) {
    super(message);
    this.name = name;
  }
}