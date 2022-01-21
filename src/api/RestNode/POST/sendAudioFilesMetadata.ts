import { httpProtocol } from './tsTypes';

export interface sendAudioBodyInterface {
  name: string;
  source: string | undefined;
  fullPath: string;
  artist?: string;
  image?: string;
  id?: string;
  length?: string;
}

export interface fileMetadataType {
  [file_name: string]: sendAudioBodyInterface;
}

export interface filesListInterface {
  [dir: string]: fileMetadataType;
}

export type sendAudioFilesMetadataType = (
  address: string,
  body: filesListInterface,
  protocol: httpProtocol
) => Promise<void>;

export const sendAudioFilesMetadata: sendAudioFilesMetadataType = async (
  address,
  body,
  protocol
) => {
  try {
    const url = `${protocol}://${address}/restnode/audio/files`;

    const method = 'POST';
    const mode = 'cors';

    const config: RequestInit = {
      method,
      mode,
      body: JSON.stringify(body),
    };

    const data = await fetch(url, config);

    console.log('Send Audio Data:', data);
  } catch (error) {
    console.log(error);
  }
};

export interface availableAudioAssetsInterface {
  [dir: string]: string[];
}

export type getAudioAssetsAvailableType = (
  address: string,
  protocol: httpProtocol
) => Promise<availableAudioAssetsInterface | undefined>;

export const getAudioAssetsAvailable: getAudioAssetsAvailableType = async (
  address,
  protocol
) => {
  try {
    const url = `${protocol}://${address}/restnode/audio/assets`;
    const mode = 'cors';
    const method = 'GET';

    const config: RequestInit = {
      method,
      mode,
    };

    const data = await fetch(url, config);
    const jsonData: availableAudioAssetsInterface = await data.json();

    return jsonData;
  } catch (error) {
    console.log(error);
  }
};
