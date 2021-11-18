import { Dispatch, SetStateAction } from 'react'
import { getDownloadUrl, listFiles } from "../api/Firebase/firebaseStorage"
import { availableAudioAssetsInterface, filesListInterface, getAudioAssetsAvailable, sendAudioBodyInterface, sendAudioFilesMetadata } from "../api/RestNode/POST/sendAudioFilesMetadata"
import { audioAssetsAvailableResponse } from '../api/RestNode/WebSocketHandlers/audioDownloadSocketResponse'
import { AudioFilesContextType } from "../contextStore/RestNodeContext/audioFiles"
import { BASE_URL } from "../services/constants"

export type listAudioFilesType = (
    targetAddress: string | null | undefined,
    setAudioAssets: Dispatch<SetStateAction<availableAudioAssetsInterface | undefined>>,
    setAudioFiles: Dispatch<SetStateAction<AudioFilesContextType>>,
    setLoading: Dispatch<SetStateAction<boolean | null>>,
) => void

export const listAudioFilesMetadata: listAudioFilesType = async (
    targetAddress, setAudioAssets, setAudioFiles, setLoading, 
) => {
    setLoading(() => true)
    const protocol = targetAddress ? 'http' : 'https'
    const dirs = ["Wake Sounds", "Night Sounds", "Relaxation Sounds"]
    const filesList: filesListInterface = {}

    for (let index = 0; index < dirs.length; index++) {
        const dir: string = dirs[index]
        const { items } = await listFiles(dir)

        filesList[dir] = {}

        for (let count = 0; count < items.length; count++) {
            const item = items[count]
            const { name, fullPath } = item
            const source = await getDownloadUrl(fullPath)

            const audioMetadata: sendAudioBodyInterface = {
                name, fullPath, source
            }

            filesList[dir][name] = audioMetadata
        }
    }

    setAudioFiles(filesList)
    sendAudioFilesMetadata(targetAddress || BASE_URL, filesList, protocol)

    audioAssetsAvailableResponse(targetAddress || BASE_URL, setAudioAssets)
    setLoading(() => false)
}