import { Dispatch, SetStateAction } from "react"
import { BASE_URL } from "../../../services/constants"
import { websocketMessageResponse } from "../../../services/restnodeServices"
import { availableAudioAssetsInterface, getAudioAssetsAvailable } from "../POST/sendAudioFilesMetadata"

export const AUDIO_DOWNLOAD_RESPONSE = "AUDIO_DOWNLOAD_RESPONSE"

export const AUDIO_ASSETS_AVAILABLE = "AUDIO_ASSETS_AVAILABLE"
export const AUDIO_FILE_DOWNLOADED = "AUDIO_FILE_DOWNLOADED"
export const AUDIO_FILE_DOWNLOAD_ERROR = "AUDIO_DOWNLOADED"
export const AUDIO_FILE_DOWNLOAD_IN_PROGRESS = "AUDIO_FILE_DOWNLOAD_IN_PROGRESS"

export type audioAssetsAvailableType = (
    targetAddress: string,
    setAudioAssets: Dispatch<SetStateAction<availableAudioAssetsInterface | undefined>>
) => void

export const audioAssetsAvailableResponse: audioAssetsAvailableType = async (
    targetAddress, setAudioAssets
) => {
    try {
        const protocol = targetAddress ? 'http': 'https'
        const audioAssetsAvailable = await getAudioAssetsAvailable(targetAddress || BASE_URL, protocol)
        
        setAudioAssets(audioAssetsAvailable)
    } catch(error) {
        console.log(error)
    }
}

export type audioFileDownloadedType = (message: websocketMessageResponse) => void

export const audioFileDownloadedResponse: audioFileDownloadedType = (message) => {
    console.log("Audio File Downloaded Response", message)
}

export type audioFileDownloadErrorType = (message: websocketMessageResponse) => void

export const audioFileDownloadErrorResponse: audioFileDownloadedType = (message) => {
    console.log("Audio File Download Error Response", message)
}

export type audioFileDownloadInProgressType = (message: websocketMessageResponse) => void

export const audioFileDownloadInProgressResponse: audioFileDownloadInProgressType = (message) => {
    console.log("Audio File Download In Progress Response")
}

export type audioDownloadResponseHandlerType = (
    message: websocketMessageResponse,
    targetAddress: string,
    setAudioAssets: Dispatch<SetStateAction<availableAudioAssetsInterface | undefined>>
) => void

const audioDownloadResponseHandler: audioDownloadResponseHandlerType = (
    message, targetAddress, setAudioAssets
) => {
    switch (message.topic) {
        case AUDIO_ASSETS_AVAILABLE:
            audioAssetsAvailableResponse(targetAddress, setAudioAssets)

            break
        case AUDIO_FILE_DOWNLOADED:
            audioFileDownloadedResponse(message)

            break
        case AUDIO_FILE_DOWNLOAD_ERROR:
            audioFileDownloadErrorResponse(message)

            break
        case AUDIO_FILE_DOWNLOAD_IN_PROGRESS:
            audioFileDownloadInProgressResponse(message)

            break
        default:
            console.log("Audio Download Response Handler", message)
    }
}

export default audioDownloadResponseHandler