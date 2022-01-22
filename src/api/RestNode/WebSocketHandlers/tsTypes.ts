import { Dispatch, SetStateAction } from 'react';
import { DownloadQueueContextInterface } from '../../../contextStore/RestNodeContext/downloadQueueContext';
import { websocketMessageResponse } from '../../../services/restnodeServices';
import { availableAudioAssetsInterface } from '../POST/sendAudioFilesMetadata';

export type audioAssetsAvailableType = (
    targetAddress: string,
    setAudioAssets: Dispatch<
        SetStateAction<availableAudioAssetsInterface | undefined>
    >
) => void;

export type audioFileDownloadedType = (
    message: websocketMessageResponse,
    downloadQueue: DownloadQueueContextInterface,
    setDownloadQueue: Dispatch<SetStateAction<DownloadQueueContextInterface>>
) => void;

export type audioFileDownloadErrorType = (
    message: websocketMessageResponse,
    downloadQueue: DownloadQueueContextInterface,
    setDownloadQueue: Dispatch<SetStateAction<DownloadQueueContextInterface>>
) => void;

export interface downloadProgressFileSizeInterface {
    total: number;
    transferred: number;
}

export interface downloadProgressTimeInterface {
    elapsed: number;
    remaining: number;
}

export interface downloadProgressResponseInterface {
    name?: string;
    percent?: number;
    speed?: number;
    topic: string;
    type: string;
    size?: downloadProgressFileSizeInterface;
    time?: downloadProgressTimeInterface;
}

export type audioFileDownloadInProgressType = (
    message: websocketMessageResponse,
    downloadQueue: DownloadQueueContextInterface,
    setDownloadQueue: Dispatch<SetStateAction<DownloadQueueContextInterface>>
) => void;

export type audioDownloadResponseHandlerType = (
    message: websocketMessageResponse,
    targetAddress: string,
    downloadQueue: DownloadQueueContextInterface,
    setAudioAssets: Dispatch<
        SetStateAction<availableAudioAssetsInterface | undefined>
    >,
    setDownloadQueue: Dispatch<SetStateAction<DownloadQueueContextInterface>>
) => void;
