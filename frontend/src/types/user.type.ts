export type LoginRequest = {
  email: string;
  password: string;
}

export type Register = {
  name: string;
  email: string;
  password: string;
}

export type LoginResponse = {
  token: string;
  name: string;
  role: string | "user" | "admin";
}
