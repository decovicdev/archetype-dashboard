import { ReactNode } from 'react';
import { AUTH_TYPES } from './Auth';

export enum FormVariant {
  default = '',
  outlined = 'border border-solid border-tblack-100'
}

export type RadioOption = {
  id: string;
  label: ReactNode;
  value: AUTH_TYPES | string;
};
