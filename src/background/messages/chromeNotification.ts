import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    chromeNotification(req.body.title, req.body.message)

    res.send({
        status: "success"
    })
}

export default handler

function chromeNotification(title: string, message: string) {
    chrome.notifications.create("", {
        type: "basic",
        iconUrl: "../../assets/icon.png",
        title: title,
        message: message
    })
}
