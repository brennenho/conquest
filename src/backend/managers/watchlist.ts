import { sendToBackground } from "@plasmohq/messaging"

import { errorNotification } from "~backend/utils"

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
        department: string
    ): Promise<boolean> {
        const email = await this._storageManager.get("userEmail")
        if (!email) {
            await sendToBackground({
                name: "chromeNotification",
                body: {
                    title: "Not logged in",
                    message: "Please log in to edit your watchlist"
                }
            })
            return false
        }

        const request = {
            section_id: sectionId,
            department: department,
            email: email
        }

        let response = null
        try {
            response = await this._httpClient.post("/watchlist/add", request)
        } catch (e) {
            // Suppress error
        }

        // Set watchlist button if addition was successful
        if (response && response.status === 200) {
            this._storageManager.addToDictionary(
                "watchlist",
                sectionId,
                response.data
            )
            return true
        } else {
            await sendToBackground({
                name: "chromeNotification",
                body: {
                    title: "Error adding to watchlist",
                    message: "Please try again later"
                }
            })
            return false
        }
    }

    /**
     * Remove a section from the user's watchlist.
     * @param sectionId
     * @param setLabel
     * @returns
     */
    public async removeFromWatchlist(sectionId: string): Promise<boolean> {
        const email = await this._storageManager.get("userEmail")
        if (!email) {
            await sendToBackground({
                name: "chromeNotification",
                body: {
                    title: "Not logged in",
                    message: "Please log in to edit your watchlist"
                }
            })
            return false
        }

        const request = {
            section_id: sectionId,
            email: email
        }
        let response = null

        try {
            response = await this._httpClient.post("/watchlist/delete", request)
        } catch (e) {
            // Suppress error
        }

        // Reset watchlist button if deletion was successful
        if (response && response.status === 200) {
            this._storageManager.removeFromDictionary("watchlist", sectionId)
            return true
        } else {
            await sendToBackground({
                name: "chromeNotification",
                body: {
                    title: "Error removing from watchlist",
                    message: "Please try again later"
                }
            })
            return false
        }
    }

    public async removeFromWatchlistFromPopup(
        sectionId: string
    ): Promise<boolean> {
        const email = await this._storageManager.get("userEmail")
        if (!email) {
            errorNotification(
                "Not logged in",
                "Please log in to edit your watchlist"
            )
            return false
        }

        const request = {
            section_id: sectionId,
            email: email
        }
        let response = null
        try {
            response = await this._httpClient.post("/watchlist/delete", request)
        } catch (e) {
            // Suppress error
        }

        if (response && response.status === 200) {
            await this._storageManager.removeFromDictionary(
                "watchlist",
                sectionId
            )
            await this._storageManager.set("courseReload", true)
            return true
        } else {
            errorNotification()
            return false
        }
    }

    /**
     * Get the user's watchlist.
     */
    public async getWatchlist() {
        const email = await this._storageManager.get("userEmail")
        if (!email) {
            console.log("User not logged in.")
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

        try {
            const watchlist = await this.getWatchlist()
            if (watchlist) {
                if (watchlist[sectionId]) {
                    return true
                }
                return false
            }
        } catch (e) {
            console.log("Error getting watchlist status.")
            return false
        }

        return false
    }
}
