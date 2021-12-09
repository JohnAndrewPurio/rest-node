import { Cacheable, ICache } from "@auth0/auth0-react"
import { MaybePromise } from "@auth0/auth0-spa-js/dist/typings/cache"
import { Storage } from "@capacitor/storage"

export const { set: setData, get: getData, remove: removeData } = Storage

type getType = <T = Cacheable>(key: string) => MaybePromise<T | null>

const get: getType = async () => {
    return JSON.parse(JSON.stringify({}))
}

const set = () => {
}

const remove = () => {
}

const cacheHandler: ICache = {
    get, set, remove
}

export default cacheHandler