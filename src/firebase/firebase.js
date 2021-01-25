import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD_aROlKRYjYIURulSsXqmag5rcL3oI0VU",
  authDomain: "react-books-1b1aa.firebaseapp.com",
  projectId: "react-books-1b1aa",
  storageBucket: "react-books-1b1aa.appspot.com",
  messagingSenderId: "363455320719",
  appId: "1:363455320719:web:71de6185a91d45fb8496fa"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }
