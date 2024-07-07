import { Storage } from "@plasmohq/storage"

export class StorageManager {
    private _storage = new Storage()

    public async set(key: string, value: any) {
        try {
            await this._storage.set(key, value)
        } catch (error) {
            console.error("Error setting value in storage:", error)
        }
    }

    public async get(key: string): Promise<any> {
        try {
            return await this._storage.get(key)
        } catch (error) {
            console.error("Error getting value from storage:", error)
            return null
        }
    }

    public async remove(key: string) {
        try {
            await this._storage.remove(key)
        } catch (error) {
            console.error("Error removing value from storage:", error)
        }
    }

    public async addToDictionary(
        dictKey: string,
        itemKey: string,
        itemValue: any
    ) {
        try {
            let dictionary = await this.get(dictKey)
            if (!dictionary) {
                dictionary = {}
            }
            dictionary[itemKey] = itemValue
            await this.set(dictKey, dictionary)
        } catch (error) {
            console.error("Error adding to dictionary in storage:", error)
        }
    }

    public async removeFromDictionary(dictKey: string, itemKey: string) {
        try {
            let dictionary = await this.get(dictKey)
            if (dictionary && itemKey in dictionary) {
                delete dictionary[itemKey]
                await this.set(dictKey, dictionary)
            }
        } catch (error) {
            console.error("Error removing from dictionary in storage:", error)
        }
    }

    public async clear() {
        try {
            await this._storage.clear()
        } catch (error) {
            console.error("Error clearing storage:", error)
        }
    }
}
