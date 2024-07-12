import { StorageManager } from "~backend/managers"

chrome.runtime.onConnect.addListener(function (port) {
    console.log("Port connected:", port.name)

    // Log the sender information if available
    if (port.sender) {
        console.log("Port connected by:", port.sender.url)
    }

    port.onDisconnect.addListener(function () {
        console.log("Port disconnected:", port.name)
    })

    port.onMessage.addListener(function (msg) {
        console.log("Message received in background script:", msg)
    })
})

async function init() {
    const storageManager = new StorageManager()

    // Erase caching on initial load of extension
    await storageManager.set("registeredCoursesCached", false)
    // Remove before release
    await storageManager.remove("registeredCourses")
    console.log("[INFO] Cache cleared on extension load")

    return true
}

init()
