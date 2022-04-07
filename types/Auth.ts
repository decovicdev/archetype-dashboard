export type AuthFormData = {
  email: string;
  password: string;
};

export enum AUTH_TYPES {
  none = 'No Auth',
  url = 'URL',
  body = 'Body',
  header = 'Header'
}
