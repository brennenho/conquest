console.log("Background script initalized")

export function notify(title: string, message: string) {
  console.log("Notification triggered")
  chrome.notifications.create(
    "",
    {
      type: "basic",
      iconUrl: "../../../assets/icon.png", // Path to the icon
      title: `${title}`,
      message: `${message}`
    },
    function (notificationId) {
      console.log("Notification displayed:", notificationId)
    }
  )
}
