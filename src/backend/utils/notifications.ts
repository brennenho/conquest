import { notifications } from "@mantine/notifications"

export function errorNotification(
    title: string = "An unexpected error occurred",
    message: string = "Please try again later"
) {
    notifications.show({
        title: title,
        message: message,
        color: "red",
        withCloseButton: false
    })
}
