import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";

import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// File Upload
export const uploadFiles = async (storage, folder, files) => {
  const promises = [];
  files.forEach((file) => {
    const fileName = `${Date.now().toString()}-${
      file.name ? v4() + file.name : "test-images"
    }`;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    promises.push(uploadTask);
  });

  const result = [];
  await Promise.allSettled(promises).then((res) => {
    res.forEach((item) => {
      if (item.status === "fulfilled") {
        result.push(item.value);
      }
    });
  });

  const urlPromises = result.map((item) => {
    const path = item.ref.toString();
    return getDownloadURL(ref(storage, path));
  });

  const urls = [];

  await Promise.allSettled(urlPromises).then((res) => {
    res.forEach((item) => {
      if (item.status === "fulfilled") {
        urls.push(item.value);
      }
    });
  });

  return urls;
};
// delete file
export const deleteImageObject = (imageUrl, storage) => {
  const deleteRef = ref(storage, imageUrl);
  deleteObject(deleteRef);
};
// When user try to Register email and password fire this function
export const registerApi = async (auth, user) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    return res.user;
  } catch (err) {
    console.log(err);
  }
};
// When user try to login with email and password fire this function
export const loginApi = async (auth, user) => {
  try {
    const { email, password } = user;
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (err) {
    console.log(err);
  }
};
// When user try to login Google Provider fire this function
export const googleApi = async (auth, provierGoogle) => {
  try {
    const res = await signInWithPopup(auth, provierGoogle);
    return res.user;
  } catch (err) {
    console.log(err);
  }
};
// When user try to login Facebook Provider fire this function
export const facebookApi = async (auth, provierFacebook) => {
  try {
    const res = await signInWithPopup(auth, provierFacebook);
    return res.user;
  } catch (err) {
    console.log(err);
  }
};
// When user click forgot password fire this function
export const forgotPassApi = async (auth, email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Success! Check your email.");
  } catch (err) {
    console.log(err);
  }
};
// When user try to login out fire this function
export const signOutApi = async (auth) => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
  }
};
// Collection Api
export const createCollection = async (db, collectionName, data) => {
  try {
    const res = await addDoc(collection(db, `${collectionName}`), data);
    return { ...data, id: res.id };
  } catch (err) {
    console.log(err);
  }
};
// when user update any specific collection data fire this function
export const updateCollection = async (db, collectionName, data) => {
  try {
    await updateDoc(doc(db, `${collectionName}/${data.id}`), data);
    console.log("Update Success!");
  } catch (err) {
    console.log(err);
  }
};
// when user delete any specific collection data fire this function
export const deleteCollection = async (db, collectionName, data) => {
  try {
    await deleteDoc(doc(db, `${collectionName}/${data.id}`));
    console.log("Delete Success!");
  } catch (err) {
    console.log(err);
  }
};

// when user get all data with pagination any specific collection data fire this function
export const getCollections = async (db, collectionName) => {
  try {
    const data = [];
    let q = query(collection(db, `${collectionName}`));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });

    return data;
  } catch (err) {
    console.log(err);
  }
};

// Single Data Collection
export const getCollection = async (collectionName, db, id) => {
  try {
    const docRef = doc(db, `${collectionName}/${id}`);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return docSnap.data();
  } catch (err) {
    console.log(err);
  }
};
