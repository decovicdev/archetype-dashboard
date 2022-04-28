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
  sendPasswordResetEmail,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential
} from 'firebase/auth';
import type { AxiosResponse } from 'axios';
import http from '../helpers/http';
import config from '../config';
import { AuthFormData } from 'types/Auth';

const app = initializeApp(config.firebase);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
export default class AuthService {
  static async getDetails(): Promise<
    AxiosResponse<{ app_id: string }>['data']
  > {
    try {
      const response = await http.get(`lost-api`);
      return response as unknown as { app_id: string };
    } catch (err) {
      const mode =
        typeof window !== 'undefined' ? localStorage.getItem('mode') : null;
      if (err?.message?.includes('status code: 500') && mode === 'test') {
        const api = await http.get('lost-api', {
          baseURL: config.apiUrls.production
        });
        const testApi = await http.post('create-api', api);
        console.log(testApi);
      }
    }
  }

  static async signup({ email, password }: AuthFormData) {
    await setPersistence(auth, browserLocalPersistence);
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(response.user, {
      url: process.env.NEXT_PUBLIC_REDIRECT_URL
    });
  }

  static async login({ email, password }: AuthFormData) {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, email, password);
  }

  static async loginWithGoogle() {
    await signInWithPopup(auth, googleProvider);
    // const credential = GoogleAuthProvider.credentialFromResult(result);
  }

  static async loginWithGithub() {
    await signInWithPopup(auth, githubProvider).catch((error) => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const pendingCred = error.credential;
        const email = error.email || error.customData?.email;
        // Get sign-in methods for this email.
        fetchSignInMethodsForEmail(auth, email).then(async function (methods) {
          if (methods[0] === 'password') {
            const password = await prompt(`Please enter password for ${email}`); // TODO: implement promptUserForPassword.

            signInWithEmailAndPassword(auth, email, password).then(function (
              result
            ) {
              return linkWithCredential(result.user, pendingCred);
            });
            return;
          }
        });
      }
    });
  }

  static async logout() {
    return await signOut(auth);
  }

  static async sendVerificationEmail({ user }) {
    return await sendEmailVerification(user, {
      url: process.env.NEXT_PUBLIC_REDIRECT_URL
    });
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
