import { getDocs } from 'firebase/firestore';
import React, { createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATA_BASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

const firebaseApp = initializeApp(firebaseConfig);
const FirebaseContext = createContext(null);
const firestore = getFirestore(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const handleAddUser = async (email) => {
    console.log('HI');
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
      console.error('Error adding user to waitlist:', error.message);
      return 'error';
    }
  };

  const fetchAllEmails = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, 'waitlistedUsers')
      );
      const emails = querySnapshot.docs.map((doc) => doc.data().user);
      console.log(emails);
    } catch (error) {
      console.error('Error fetching emails from waitlist:', error.message);
      return [];
    }
  };
  fetchAllEmails();

  return (
    <FirebaseContext.Provider value={{ handleAddUser }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
