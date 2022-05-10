import {
  applyActionCode,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth } from 'services/firebaseAuth.service';
import { HttpService } from 'services/http';
import { AuthFormData, User } from 'types';

class AuthService {
  constructor(private _http: HttpService) {}

  public getDetails() {
    return this._http.request<User>('lost-api', { method: 'get' });
  }

  public async signup({ email, password }: AuthFormData) {
    await setPersistence(auth, browserLocalPersistence);
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(response.user, {
      url:
        process.env.NEXT_PUBLIC_REDIRECT_URL ||
        'https://beta.archetype.dev/auth/onboard?confirm_email=true'
    });
  }

  public async login({ email, password }: AuthFormData) {
    await setPersistence(auth, browserLocalPersistence);
    return signInWithEmailAndPassword(auth, email, password);
  }

  public async loginWithGoogle() {
    await signInWithPopup(auth, new GoogleAuthProvider());
  }

  public async loginWithGithub() {
    try {
      await signInWithPopup(auth, new GithubAuthProvider());
    } catch (error) {
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
    }
  }

  public logout() {
    return signOut(auth);
  }

  public sendVerificationEmail({ user }) {
    return sendEmailVerification(user, {
      url:
        process.env.NEXT_PUBLIC_REDIRECT_URL ||
        'https://beta.archetype.dev/auth/onboard?confirm_email=true'
    });
  }

  public sendResetPasswordEmail({ email }) {
    return sendPasswordResetEmail(auth, email);
  }

  public async verifyEmail(oobCode: string) {
    await applyActionCode(auth, oobCode);
    if (auth.currentUser) {
      await auth.currentUser.reload();
    }
  }
}

export { AuthService };
