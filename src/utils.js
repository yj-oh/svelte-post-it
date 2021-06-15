import { v4 as uuidV4 } from 'uuid';

export function getUuid() {
	return uuidV4();
}

export function getInitBoard() {
	return { id: getUuid(), name: '새 보드' };
}
