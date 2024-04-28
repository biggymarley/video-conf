import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { toast } from "sonner";
import { doc, getDoc, setDoc } from "firebase/firestore";

const actionConfig = {
  handleCodeInApp: true,
  url: "http://localhost:5173/",
};

export const loginUser = async (email, password, saveToken, setAppLoading) => {
  try {
    setAppLoading(true);
    const res = await signInWithEmailAndPassword(auth, email, password);
    // after login the user we must get data from fireStore
    //and returning the resault to the app*
    const docRef = doc(db, "users", res.user.uid);
    const user = await getDoc(docRef);
    setAppLoading(false);
    toast.success("Welcome to Discord Clone.");
    saveToken(res.user.accessToken, user.data());

    // return user?.data() ?? null;
  } catch (error) {
    setAppLoading(false);
    console.error(error);
    toast.error(
      error?.code?.replace("auth/", "").replaceAll("-", " ") ||
        "error please retry"
    );
  }
};

export const createUser = async (email, password, userName, setAppLoading, saveToken) => {
  try {
    setAppLoading(true);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await sendEmailVerification(userCredential.user, actionConfig);
    // using firebase firestore to store data with new fields "name, role"
    // and linking it with firebase Authentication database with user uid
    if (userCredential?.user) {
      const user = {
        uid: userCredential.user.uid,
        userName: userName,
        email: email,
      };
      await setDoc(doc(db, "users", userCredential.user.uid), user);
    }
    setAppLoading(false);
    toast.success(
      "Your sign up request has been successfully received! We have sent you a verification link to your email.  If you have not received it in your inbox, please check your spam folder or contact us at Rbat-l3assima@lfog.com."
    );
  } catch (error) {
    setAppLoading(false);

    toast.error(
      error?.code?.replace("auth/", "").replaceAll("-", " ") ||
        "error please retry"
    );
    return null;
  }
};

export const googleLogin = async (saveToken, setAppLoading) => {
  const provider = new GoogleAuthProvider();
  try {
    setAppLoading(true);
    const result = await signInWithPopup(auth, provider);
    setAppLoading(false);
    const user = result.user;
    saveToken(user.accessToken);
  } catch (error) {
    setAppLoading(false);
    console.error(error);
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email, actionConfig);
    toast.success("Password reset email sent. Check your inbox.");
  } catch (error) {
    console.error(error);
    toast.success(error?.message ?? "Server error please try again!");
  }
};
