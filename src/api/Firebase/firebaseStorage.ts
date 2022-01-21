import {
  getDownloadURL,
  getStorage,
  ref,
  list,
  ListOptions,
  ListResult,
  getMetadata,
  FullMetadata,
} from 'firebase/storage';
import { firebaseApp } from './firebaseInit';

const NIGHT_SOUNDS = 'Night Sounds';
const RELAXATION_SOUNDS = 'Relaxation Sounds';
const WAKE_SOUNDS = 'Wake Sounds';

export const storage = getStorage(firebaseApp);
export const storageRef = ref(storage);

export const nightSounds = ref(storage, NIGHT_SOUNDS);
export const wakeSounds = ref(storage, WAKE_SOUNDS);
export const relaxationsSounds = ref(storage, RELAXATION_SOUNDS);

export type getDownloadUrlType = (
  fileName: string
) => Promise<string | undefined>;

export const getDownloadUrl: getDownloadUrlType = async (fileName) => {
  try {
    const resourceUrl = await getDownloadURL(ref(storage, fileName));

    return resourceUrl;
  } catch (error) {
    console.log('Get Download Url Error:', error);
    throw error;
  }
};

type listFilesType = (dir: string) => Promise<ListResult>;

export const listFiles: listFilesType = async (dir) => {
  const listRef = ref(storage, dir);
  const options: ListOptions = {
    maxResults: 100,
  };

  const page = await list(listRef, options);

  return page;
};

type retrieveMetadataType = (path: string) => Promise<FullMetadata>;

export const retrieveMetadata: retrieveMetadataType = async (path) => {
  const storageRef = ref(storage, path);

  const page = await getMetadata(storageRef);

  return page;
}