export interface wifiCredentialsInterface {
    [key: string]: string
}

type postNetworkCredentialsType = (url: string, wifiCredentials: wifiCredentialsInterface) => Promise<void>

export const postNetworkCredentials: postNetworkCredentialsType = async (url, wifiCredentials) => {
    const config = {
        method: "POST",
        body: JSON.stringify(wifiCredentials)
    }
    
    try {
        const fetchedData = await fetch(url, config)
        const jsonData = fetchedData.json()

        console.log(jsonData)
    } catch(error) {
        console.log(error)
    }
}