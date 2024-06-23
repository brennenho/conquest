import { StorageManager } from "."
import { HTTPClient } from "../../backend/http"

export class WatchlistManager {
    private _storageManager = new StorageManager()
    private _httpClient = HTTPClient.inst()

    /**
     * Add a section to the user's watchlist.
     * @param sectionId
     * @param department
     * @param setLabel
     * @returns
     */
    public async addToWatchlist(
        sectionId: string,
        department: string,
        setLabel: (label: string) => void
    ) {
        const email = await this._storageManager.get("userEmail")
        if (!email) {
            console.error("User not logged in.")
            return
        }

        const request = {
            section_id: sectionId,
            department: department,
            email: email
        }

        const response = await this._httpClient.post("/watchlist/add", request)
        if (response.status === 200) {
            setLabel("Remove from watchlist")
            this._storageManager.set(sectionId, email)
        } else {
            setLabel("Failed. Try again.")
        }
    }

    /**
     * Remove a section from the user's watchlist.
     * @param sectionId
     * @param setLabel
     * @returns
     */
    public async removeFromWatchlist(
        sectionId: string,
        setLabel: (label: string) => void
    ) {
        const email = await this._storageManager.get("userEmail")
        if (!email) {
            console.log("User not logged in.")
            return
        }

        const request = {
            section_id: sectionId,
            email: email
        }

        const response = await this._httpClient.post(
            "/watchlist/delete",
            request
        )
        if (response.status === 200) {
            setLabel("Add to watchlist")
            this._storageManager.remove(sectionId)
        } else {
            setLabel("Failed. Try again.")
        }
    }

    /**
     * Send a request to the server to get the user's watchlist.
     * @returns
     */
    public async getWatchlist() {
        const email = await this._storageManager.get("userEmail")
        if (!email) {
            console.error("User not logged in.")
            return
        }

        const response = await this._httpClient.post("/watchlist/search", email)
        if (response.status === 200) {
            for (const section of response.data) {
                await this._storageManager.set(section.section_id, email)
            }
            this._storageManager.set("watchlistCached", true)
        }

        return
    }

    /**
     * Get the watchlist status of a section.
     * @param sectionId
     * @returns
     */
    public async getWatchlistStatus(sectionId: string): Promise<boolean> {
        const email = await this._storageManager.get("userEmail")
        // User is not logged in
        if (!email) {
            return false
        }

        // Check if currently logged in user is watching the section
        const status = await this._storageManager.get(sectionId)
        if (status === email) {
            return true
        }

        // Current user has no status stored, check if a server request has been made
        const cached = await this._storageManager.get("watchlistCached")
        if (cached) {
            return false
        }

        // This user hasn't made a search request to the server yet
        this.getWatchlist()

        // User is not watching this section, remove any stored status
        await this._storageManager.remove(sectionId)
        return false
    }
}
