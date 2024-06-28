import { StorageManager } from "~backend/managers"

console.log("Background script initalized")

const storageManager = new StorageManager()
// Erase caching on initial load of extension
console.log("Clearing cache")
storageManager.set("registeredCoursesCached", false)
storageManager.set("watchlistCached", false)
