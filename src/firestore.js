import './firebase';
import firebase from 'firebase';
import { getInitBoard } from './utils';

const COLLECTION_NAME = 'boards';

const db = firebase.firestore();

export const getBoardList = async (userId) => {
	let data = [];

	await db
		.collection(COLLECTION_NAME)
		.where('board.userId', '==', userId)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				data.push(doc.data().board);
			});
		})
		.catch((e) => {
			console.log(e);
		});
	return data;
};

export const addBoard = async (userId) => {
	const initBoard = getInitBoard(userId);
	console.log(initBoard);

	await db.collection(COLLECTION_NAME).add({ board: initBoard });
};
