import { httpProtocol } from './tsTypes';

export interface messageType {
    fullPath: string;
}

export type downloadAudioFileType = (
    address: string,
    protocol: httpProtocol,
    message: messageType
) => Promise<void>;

export const downloadAudioFile: downloadAudioFileType = async (
    address,
    protocol,
    message
) => {
    try {
        const url = `${protocol}://${address}/restnode/audio/files/download`;
        const method = 'POST';
        const mode = 'cors';
        const body = JSON.stringify(message);

        const config: RequestInit = {
            method,
            mode,
            body,
        };

        const data = await fetch(url, config);
        const jsonData = await data.json();

        return jsonData;
    } catch (error) {
        console.log(error);
    }
};
