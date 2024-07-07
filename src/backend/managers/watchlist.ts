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

        // Set watchlist button if addition was successful
        if (response.status === 200) {
            setLabel("Remove from watchlist")
            this._storageManager.addToDictionary(
                "watchlist",
                sectionId,
                response.data
            )
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

        // Reset watchlist button if deletion was successful
        if (response.status === 200) {
            setLabel("Add to watchlist")
            this._storageManager.removeFromDictionary("watchlist", sectionId)
        } else {
            setLabel("Failed. Try again.")
        }
    }

    public async removeFromWatchlistFromPopup(sectionId: string) {
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
            this._storageManager.removeFromDictionary("watchlist", sectionId)
        }
    }

    /**
     * Get the user's watchlist.
     */
    public async getWatchlist() {
        const email = await this._storageManager.get("userEmail")
        if (!email) {
            console.error("User not logged in.")
            return
        }

        const cached = await this._storageManager.get("watchlist")
        if (cached) {
            return cached
        }

        const response = await this._httpClient.post("/watchlist/search", email)
        if (response.status === 200) {
            await this._storageManager.set("watchlist", response.data)
            return response.data
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

        const watchlist = await this.getWatchlist()
        if (watchlist) {
            if (watchlist[sectionId]) {
                return true
            }
            return false
        }

        return false
    }
}
