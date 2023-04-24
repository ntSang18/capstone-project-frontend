import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

class FirebaseService {
  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const res = signInWithPopup(getAuth(), provider);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new FirebaseService();
