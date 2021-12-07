import Firebase, { AuthPersistance } from "../firebase.js";

export default class UserService {
  static async signUp(email, password, displayName) {
    await Firebase.auth().setPersistence(AuthPersistance.LOCAL);

    const response = await Firebase.auth().createUserWithEmailAndPassword(
      email,
      password
    );

    await response.user.sendEmailVerification();
    await response.user.updateProfile({ displayName });

    return response.user;
  }

  static async login(email, password) {
    await Firebase.auth().setPersistence(AuthPersistance.LOCAL);

    return await Firebase.auth().signInWithEmailAndPassword(email, password);
  }

  static async logout() {
    return await Firebase.auth().signOut();
  }

  static async verifyEmail(oobCode) {
    await Firebase.auth().applyActionCode(oobCode);

    if (Firebase.auth().currentUser) {
      await Firebase.auth().currentUser.reload();
    }
  }

  static async deleteAccount() {
    return await Firebase.auth().signOut();
  }
}
