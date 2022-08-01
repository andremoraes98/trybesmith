export interface User {
  id?: number,
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
  
  httpCode: number;

  constructor(name: string, httpCode: number, message: string) {
    super(message);
    this.name = name;
    this.httpCode = httpCode;
  }
}