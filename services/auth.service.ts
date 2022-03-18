import { initializeApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  sendEmailVerification,
  applyActionCode,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import type { AxiosResponse } from 'axios';
import http from '../helpers/http';
import config from '../config';
import { AuthFormData } from 'types/Auth';

const app = initializeApp(config.firebase);
export const auth = getAuth(app);

export default class AuthService {
  static async getDetails(): Promise<
    AxiosResponse<{ app_id: string }>['data']
  > {
    return await http.get(`lost-api`);
  }

  static async signup({ email, password }: AuthFormData) {
    await setPersistence(auth, browserLocalPersistence);
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(response.user);
  }

  static async login({ email, password }: AuthFormData) {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, email, password);
  }

  static async logout() {
    return await signOut(auth);
  }

  static async sendVerificationEmail({ user }) {
    return await sendEmailVerification(user);
  }

  static async sendResetPasswordEmail({ email }) {
    return await sendPasswordResetEmail(auth, email);
  }

  static async verifyEmail(oobCode: string) {
    await applyActionCode(auth, oobCode);
    if (auth.currentUser) {
      await auth.currentUser.reload();
    }
  }
}
