import { KeysResult, Storage } from "@capacitor/storage"

const { get, set, keys, remove, clear } = Storage

export type storageSetType = (
    data: any,
    key: string
) => void

export const storageSet: storageSetType = async (data, key) => {
    try {
        const value = JSON.stringify(data)
        const options = {
            key, value
        }
    
        set(options)
    } catch(error) {
        console.log(error)
        throw error
    }
    
}

export type storageGetType = (key: string) => Promise<any>

export const storageGet: storageGetType = async (key) => {
    try {
        const options = {
            key
        }

        const { value } = await get(options)

        if(!value)
            return

        const data = JSON.parse(value)

        return data
    } catch(error) {
        console.log(error)
        throw error
    }
}

export type storageKeysType = () => Promise<KeysResult>

export const storageKeys: storageKeysType = async () => {
    try {
        const availableKeys = await keys()

        return availableKeys
    } catch(error) {
        console.log(error)
        throw error
    }
}

export type storageRemoveType = (key: string) => Promise<void>

export const storageRemove: storageRemoveType = async (key) => {
    try {
        const options = {
            key
        }

        remove(options)
    } catch(error) {
        console.log(error)
        throw error
    }
}

export type storageClearType = () => Promise<void>

export const storageClear = async () => {
    try {
        clear()
    } catch(error) {
        console.log(error)
        throw error
    }
}