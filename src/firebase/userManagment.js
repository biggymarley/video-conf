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
const colors = [
  { name: "Slate", value: "#64748b" },
  { name: "Gray", value: "#6b7280" },
  { name: "Zinc", value: "#71717a" },
  { name: "Neutral", value: "#737373" },
  { name: "Stone", value: "#78716c" },
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Yellow", value: "#eab308" },
  { name: "Lime", value: "#84cc16" },
  { name: "Green", value: "#22c55e" },
  { name: "Emerald", value: "#10b981" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Sky", value: "#0ea5e9" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Purple", value: "#a855f7" },
  { name: "Fuchsia", value: "#d946ef" },
  { name: "Pink", value: "#ec4899" },
  { name: "Rose", value: "#f43f5e" },
];

export const createUser = async (
  email,
  password,
  userName,
  setAppLoading,
  saveToken
) => {
  try {
    setAppLoading(true);
    const getRandomColor = () => {
      const randomIndex = Math.floor(Math.random() * colors.length);
      const selectedColor = colors[randomIndex];
      return `text-${selectedColor.name.toLowerCase()}-500`;
    };
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
        color: getRandomColor(),
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
