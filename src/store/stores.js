import { writableStorage } from './store-util';
import { getInitBoard } from '../utils';

const initBoard = getInitBoard();

export const boardList = writableStorage('boardList', [initBoard]);
export const activeBoard = writableStorage('activeBoard', initBoard);
