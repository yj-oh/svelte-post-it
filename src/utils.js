import { v4 as uuidV4 } from 'uuid';

export function getUuid() {
	return uuidV4();
}

export function getInitBoard() {
	return { id: getUuid(), name: '새 보드' };
}

export function getInitPostIt(boardId) {
	return {
		id: getUuid(),
		boardId: boardId,
		content: '',
		isOpen: true,
		position: { x: 20, y: 20 },
		size: { width: 200, height: 200 },
		title: '새 포스트잇',
		zIndex: 1,
	};
}
