import firebase from 'firebase/app';

const firebaseConfig = {
	apiKey: APP_API_KEY,
	authDomain: APP_AUTH_DOMAIN,
	projectId: APP_PROJECT_ID,
	storageBucket: APP_STORAGE_BUCKET,
	messagingSenderId: APP_MESSAGING_SENDER_ID,
	appId: APP_APP_ID,
};
firebase.initializeApp(firebaseConfig);
