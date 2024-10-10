import { openDB } from 'idb';

const DB_NAME = 'taskManagerDB';
const STORE_NAME = 'offlineActions';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
  },
});

export const saveOfflineAction = async (action) => {
  const db = await dbPromise;
  await db.add(STORE_NAME, action);
};

export const getOfflineActions = async () => {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
};

export const clearOfflineActions = async () => {
  const db = await dbPromise;
  await db.clear(STORE_NAME);
};