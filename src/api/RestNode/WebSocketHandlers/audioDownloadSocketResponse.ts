import { BASE_URL } from '../../../services/constants';
import { getAudioAssetsAvailable } from '../POST/sendAudioFilesMetadata';
import {
  audioAssetsAvailableType,
  audioDownloadResponseHandlerType,
  audioFileDownloadedType,
  audioFileDownloadInProgressType,
  downloadProgressResponseInterface,
} from './tsTypes';

export const AUDIO_DOWNLOAD_RESPONSE = 'AUDIO_DOWNLOAD_RESPONSE';

export const AUDIO_ASSETS_AVAILABLE = 'AUDIO_ASSETS_AVAILABLE';
export const AUDIO_FILE_DOWNLOADED = 'AUDIO_FILE_DOWNLOADED';
export const AUDIO_FILE_DOWNLOAD_ERROR = 'AUDIO_DOWNLOADED';
export const AUDIO_FILE_DOWNLOAD_IN_PROGRESS =
  'AUDIO_FILE_DOWNLOAD_IN_PROGRESS';

export const audioAssetsAvailableResponse: audioAssetsAvailableType = async (
  targetAddress,
  setAudioAssets
) => {
  try {
    const protocol = targetAddress ? 'http' : 'https';
    const audioAssetsAvailable = await getAudioAssetsAvailable(
      targetAddress || BASE_URL,
      protocol
    );

    setAudioAssets(audioAssetsAvailable);
  } catch (error) {
    console.log(error);
  }
};

export const audioFileDownloadedResponse: audioFileDownloadedType = (
  message,
  downloadQueue,
  setDownloadQueue
) => {
  console.log('Audio File Downloaded Response', message);
  const { name }: downloadProgressResponseInterface = message;
  const downloads = {
    ...downloadQueue,
  };

  delete downloads[name];

  setDownloadQueue(downloads);
};

export const audioFileDownloadErrorResponse: audioFileDownloadedType = (
  message,
  downloadQueue,
  setDownloadQueue
) => {
  console.log('Audio File Download Error Response', message);
  const { name }: downloadProgressResponseInterface = message;
  const downloads = {
    ...downloadQueue,
  };

  delete downloads[name];

  setDownloadQueue(downloads);
};

export const audioFileDownloadInProgressResponse: audioFileDownloadInProgressType =
  (message, downloadQueue, setDownloadQueue) => {
    const { name }: downloadProgressResponseInterface = message;
    const downloads = {
      ...downloadQueue,
      [name]: true,
    };

    setDownloadQueue(downloads);
  };

const audioDownloadResponseHandler: audioDownloadResponseHandlerType = (
  message,
  targetAddress,
  downloadQueue,
  setAudioAssets,
  setDownloadQueue
) => {
  switch (message.topic) {
    case AUDIO_ASSETS_AVAILABLE:
      audioAssetsAvailableResponse(targetAddress, setAudioAssets);

      break;
    case AUDIO_FILE_DOWNLOADED:
      audioFileDownloadedResponse(message, downloadQueue, setDownloadQueue);

      break;
    case AUDIO_FILE_DOWNLOAD_ERROR:
      audioFileDownloadErrorResponse(message, downloadQueue, setDownloadQueue);

      break;
    case AUDIO_FILE_DOWNLOAD_IN_PROGRESS:
      audioFileDownloadInProgressResponse(
        message,
        downloadQueue,
        setDownloadQueue
      );

      break;
    default:
      console.log('Audio Download Response Handler', message);
  }
};

export default audioDownloadResponseHandler;
