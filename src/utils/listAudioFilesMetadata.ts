import { Dispatch, SetStateAction } from 'react';
import { getDownloadUrl, listFiles } from '../api/Firebase/firebaseStorage';
import {
  filesListInterface,
  sendAudioBodyInterface,
  sendAudioFilesMetadata,
} from '../api/RestNode/POST/sendAudioFilesMetadata';
import { AudioFilesContextType } from '../contextStore/RestNodeContext/audioFiles';
import { BASE_URL } from '../services/constants';

export type listAudioFilesType = (
    targetAddress: string | null | undefined,
    audioFiles: filesListInterface,
    setAudioFiles: Dispatch<SetStateAction<AudioFilesContextType>>,
    setLoading?: Dispatch<SetStateAction<boolean>>,
) => void

export const listAudioFilesMetadata: listAudioFilesType = async (
  targetAddress,
  audioFiles,
  setAudioFiles,
  setLoading
) => {
  const protocol = targetAddress ? 'http' : 'https';
  const dirs = ['Wake Sounds', 'Night Sounds', 'Relaxation Sounds'];
  const filesList: filesListInterface = { ...audioFiles };

  try {
    for (let index = 0; index < dirs.length; index++) {
      const dir: string = dirs[index];
      const { items } = await listFiles(dir);

      filesList[dir] = {};

      for (let count = 0; count < items.length; count++) {
        const item = items[count];
        const { name, fullPath } = item;
        const source = await getDownloadUrl(fullPath);

        const audioMetadata: sendAudioBodyInterface = {
          name,
          fullPath,
          source,
        };

        filesList[dir][name] = audioMetadata;
      }
    }

    setAudioFiles(filesList);
  } catch (error) {
    console.log(error);
  }

  sendAudioFilesMetadata(targetAddress || BASE_URL, filesList, protocol);
};
