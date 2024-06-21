import { StorageManager } from "."
import { HTTPClient } from "../../backend/http"

export class WatchlistManager {
  private _storageManager = new StorageManager()
  private _httpClient = HTTPClient.inst()

  public async addToWatchlist(
    sectionId: string,
    department: string,
    setLabel: (label: string) => void
  ) {
    const email = await this._storageManager.getEmail()
    if (!email) {
      console.log("Error: user not logged in.")
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

  public async removeFromWatchlist(
    sectionId: string,
    setLabel: (label: string) => void
  ) {
    const email = await this._storageManager.getEmail()
    if (!email) {
      console.log("Error: user not logged in.")
      return
    }

    const request = {
      section_id: sectionId,
      email: email
    }

    const response = await this._httpClient.post("/watchlist/delete", request)
    if (response.status === 200) {
      setLabel("Add to watchlist")
      this._storageManager.remove(sectionId)
    } else {
      setLabel("Failed. Try again.")
    }
  }

  public async getWatchlistStatus(sectionId: string): Promise<boolean> {
    const email = await this._storageManager.getEmail()
    if (!email) {
      return false
    }
    const status = await this._storageManager.get(sectionId)
    console.log(status)
    if (status === email) {
      // currently logged in user is watching
      return true
    }
    // current user has no status stored, request server
    // TODO: make this one request for the entire page, rather than a request for each button
    const request = {
      section_id: sectionId,
      email: email
    }
    const response = await this._httpClient.post("/watchlist/search", request)
    if (response.status === 200 && response.data) {
      // stored status differs from server status
      await this._storageManager.set(sectionId, email)
      return true
    }

    // user is not watching
    await this._storageManager.remove(sectionId)
    return false
  }
}
