import React, { createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
const firebaseConfig = {
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
};

const firebaseApp = initializeApp(firebaseConfig);
const FirebaseContext = createContext(null);
const firestore = getFirestore(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const handleAddUser = async (email) => {
    try {
      const result = await addDoc(collection(firestore, 'waitlistedUsers'), {
        user: email,
      });
      if (result) {
        return 'success';
      } else {
        return 'error';
      }
    } catch (error) {
      return 'error';
    }
  };
  return (
    <FirebaseContext.Provider value={{ handleAddUser }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
