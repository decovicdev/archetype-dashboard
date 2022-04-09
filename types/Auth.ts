export type AuthFormData = {
  email: string;
  password: string;
};

export enum AUTH_TYPES {
  none = 'none',
  url = 'url',
  body = 'body',
  header = 'header'
}
