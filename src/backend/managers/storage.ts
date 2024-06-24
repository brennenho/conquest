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

    public async clear() {
        try {
            await this._storage.clear()
        } catch (error) {
            console.error("Error clearing storage:", error)
        }
    }
}
