import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, storage } from "./firebaseConfig";
import { toast } from "sonner";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { ref as sRef } from "firebase/storage";

const actionConfig = {
  handleCodeInApp: true,
  url: "https://video-conf-pink.vercel.app/",
};

export const loginUser = async (email, password, saveToken, setAppLoading) => {
  try {
    setAppLoading(true);
    const res = await signInWithEmailAndPassword(auth, email, password);
    // after login the user we must get data from fireStore
    //and returning the resault to the app*
    const docRef = doc(db, "users", res.user.uid);
    const user = await getDoc(docRef);
    const users = await getDocs(collection(db, "users"));
    let usersArray = [];
    users.forEach((docs) => {
      // doc.data() is never undefined for query doc snapshots
      usersArray = [...usersArray, docs.data()];
    });
    setAppLoading(false);
    saveToken(res.user.accessToken, user.data(), usersArray);
    if (!user.data().bannerUrl || !user.data().logoUrl)
      toast.warning(
        "Please proceed to the profile screen to complete your profile."
      );
    else toast.success("Welcome to Discord Clone.");

    // return user?.data() ?? null;
  } catch (error) {
    setAppLoading(false);
    console.error("errrrrrrrrrr", error);
    toast.error(
      error?.code?.replace("auth/", "").replaceAll("-", " ") ||
        "Server error, Contact Biggy"
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
      return selectedColor.value;
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
        roles: [{ id: "662dfc6add47a667f37ba353", label: "Wagners" }],
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
        "Server error, Contact Biggy"
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
    toast.error("Server error, Contact Biggy");

    console.error(error);
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email, actionConfig);
    toast.success("Password reset email sent. Check your inbox.");
  } catch (error) {
    console.error(error);
    toast.error("Server error, Contact Biggy");
  }
};
const removeEmptyFields = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      acc[key] = value;
    }
    return acc;
  }, {});
};

const getUser = async (saveTokenUser) => {
  try {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const userfa = docSnap.data();
        saveTokenUser(userfa);
      } else {
        console.log("noUser");
      }
    });
  } catch (error) {
    toast.error("Server error, Contact Biggy");
    console.log(error);
  }
};

const getUsers = async (saveTokenUsers) => {
  try {
    const users = await getDocs(collection(db, "users"));
    let usersArray = [];
    users.forEach((docs) => {
      usersArray = [...usersArray, docs.data()];
    });
    saveTokenUsers(usersArray);
  } catch (error) {
    console.log(error);
    toast.error("Server error, Contact Biggy");

    return null;
  }
};

export const getRooms = async () => {
  try {
    const users = await getDocs(collection(db, "rooms"));
    let usersArray = [];
    users.forEach((docs) => {
      usersArray = [...usersArray, docs.data()];
    });
    return usersArray;
  } catch (error) {
    console.log(error);
    toast.error("Server error, Contact Biggy");

    return null;
  }
};

export const updateProfile = async (
  userdata,
  userImagebanner,
  userImagelogo,
  setAppLoading,
  saveTokenUser,
  saveTokenUsers
) => {
  try {
    setAppLoading(true);
    const userDatacleaned = removeEmptyFields(userdata);
    await setDoc(
      doc(db, "users", userDatacleaned.uid),
      {
        ...userDatacleaned,
      },
      { merge: true }
    );
    if (
      (userImagebanner &&
        userImagebanner.name.match(/\.(jpg|jpeg|png|gif)$/i)) ||
      (userImagelogo && userImagelogo.name.match(/\.(jpg|jpeg|png|gif)$/i))
    ) {
      if (
        userImagebanner &&
        userImagebanner.name.match(/\.(jpg|jpeg|png|gif)$/i)
      ) {
        await UploadImageBanner(
          `${userDatacleaned.uid}`,
          userImagebanner,
          doc(db, "users", userDatacleaned.uid),
          userDatacleaned
        );
      }
      if (userImagelogo && userImagelogo.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        await UploadImageLogo(
          `${userDatacleaned.uid}`,
          userImagelogo,
          doc(db, "users", userDatacleaned.uid),
          userDatacleaned
        );
      }
      await getUser(saveTokenUser);
      await getUsers(saveTokenUsers);
      toast.success("Profie Updated");
      setAppLoading(false);
    } else {
      getUser(saveTokenUser);
      getUsers(saveTokenUsers);
      setAppLoading(false);
      toast.success("Profie Updated");
    }
  } catch (error) {
    console.log(error);
    toast.error("Server error, Contact Biggy");
    return null;
  }
};

export const updateProfileRollesRooms = async (
  id,
  roles,
  setAppLoading,
  saveTokenUser,
  saveTokenUsers
) => {
  try {
    setAppLoading(true);

    await setDoc(
      doc(db, "users", id),
      {
        roles: roles,
      },
      { merge: true }
    );
    await getUser(saveTokenUser);
    await getUsers(saveTokenUsers);
    setAppLoading(false);
    toast.success("Profie Updated");
  } catch (error) {
    console.log(error);
    toast.error("Server error, Contact Biggy");
    return null;
  }
};

export const UploadRoomLogo = async (id, roomImage) => {
  try {
    const imageRef = sRef(storage, `usersImgs/${id}-room`);
    await uploadBytes(imageRef, roomImage);
    //get image url and update document and add imageUrl to it
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    toast.error("Server error, Contact Biggy");
    return null;
  }
};

export const UploadImageLogo = async (uid, userImage, userRef, data) => {
  try {
    const imageRef = sRef(storage, `usersImgs/${uid}-logo`);
    await uploadBytes(imageRef, userImage);
    //get image url and update document and add imageUrl to it
    const url = await getDownloadURL(imageRef);

    await setDoc(
      userRef,
      {
        logoUrl: url,
        uid: uid,
      },
      { merge: true }
    );
    return { ...data, logoUrl: url, uid: uid };
  } catch (error) {
    console.log(error);
    toast.error("Server error, Contact Biggy");
    return null;
  }
};

export const UploadImageBanner = async (uid, userImage, userRef, data) => {
  try {
    const imageRef = sRef(storage, `usersImgs/${uid}-banner`);
    await uploadBytes(imageRef, userImage);
    //get image url and update document and add imageUrl to it
    const url = await getDownloadURL(imageRef);

    await setDoc(
      userRef,
      {
        bannerUrl: url,
        uid: uid,
      },
      { merge: true }
    );
    return { ...data, bannerUrl: url, uid: uid };
  } catch (error) {
    console.log(error);
    toast.error("Server error, Contact Biggy");
    return null;
  }
};
