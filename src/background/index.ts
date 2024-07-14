import { StorageManager } from "~backend/managers"

async function init() {
    const storageManager = new StorageManager()

    // Erase caching on initial load of extension
    await storageManager.set("registeredCoursesCached", false)
    // Remove before release
    await storageManager.remove("registeredCourses")

    await storageManager.set("courseReload", false)
    console.log("[INFO] Cache cleared on extension load")

    return true
}

init()
