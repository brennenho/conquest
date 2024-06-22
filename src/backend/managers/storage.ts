import { Storage } from "@plasmohq/storage"

export class StorageManager {
    private _storage = new Storage()

    public async set(key: string, value: any) {
        await this._storage.set(key, value)
    }

    public async get(key: string): Promise<any> {
        return await this._storage.get(key)
    }

    public async remove(key: string) {
        await this._storage.remove(key)
    }

    public async clear() {
        await this._storage.clear()
    }
}
