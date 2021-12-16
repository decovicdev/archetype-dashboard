import Firebase, { AuthPersistance } from "../firebase.js";
import http from "../helpers/http";

export default class AccountService {
  static async getDetails() {
    return await http.get(`lost-api`);
  }

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

    await Firebase.auth().signInWithEmailAndPassword(email, password);
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

  static async stripeCheckout() {
    const appId = sessionStorage.getItem("appId");
    if (!appId) {
      return null;
    }

    return await http.post(`checkout/${appId}`);
  }
}
