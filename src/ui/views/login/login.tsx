import {
    Button,
    Drawer,
    PinInput,
    rem,
    Text,
    TextInput,
    Title
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconAt } from "@tabler/icons-react"
import cn from "classnames"
import React, { useState } from "react"

import { getPassword, validatePassword } from "~backend/managers"

import sharedStyles from "../../sharedStyles.module.scss"
import style from "./login.module.scss"

interface LoginViewProps {
    handleLogin: (email: string) => void
}

export const LoginView: React.FC<LoginViewProps> = ({ handleLogin }) => {
    const [email, setEmail] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [pinError, setPinError] = useState<boolean>(false)
    const [opened, { open, close }] = useDisclosure(false)

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSubmit = () => {
        if (!email) {
            setError("Email is required.")
            return
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email.")
            return
        }

        getPassword(email)
        open()

        // handleLogin(email)
    }

    const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />

    return (
        <div className={cn(style.login, sharedStyles.flexColumn)}>
            <Drawer
                opened={opened}
                onClose={close}
                overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                offset={8}
                size={384}
                radius="md"
                position="bottom"
                title="Email Verification">
                {
                    <div>
                        <Text fw={700} size="xs" ta="center">
                            Please check your email for a one-time verification
                            code. Your code will expire in 10 minutes.
                        </Text>
                        <div className={style.pin}>
                            <PinInput
                                size="sm"
                                length={5}
                                oneTimeCode
                                placeholder=""
                                error={pinError}
                                type="number"
                                onChange={(event) => {
                                    if (event.length < 5) {
                                        setPinError(false)
                                    } else if (event.length === 5) {
                                        validatePassword(email, event).then(
                                            (res) => {
                                                console.log("TEST")
                                                console.log(res.data)
                                                if (res.data) {
                                                    handleLogin(email)
                                                } else {
                                                    setPinError(true)
                                                }
                                            }
                                        )
                                    }
                                }}
                            />
                        </div>
                        <div className={style.button}>
                            <Button
                                variant="light"
                                color="red"
                                size="sm"
                                fullWidth
                                onClick={handleSubmit}>
                                Resend Code
                            </Button>
                        </div>
                    </div>
                }
            </Drawer>
            <div className={style.title}>
                <Title order={1}>CONQUEST</Title>
            </div>
            <Text fw={500} ta="center">
                Please enter your USC email.
            </Text>
            <div className={style.input}>
                <TextInput
                    variant="filled"
                    radius="sm"
                    error={error}
                    placeholder="tommy@usc.edu"
                    leftSection={icon}
                    onChange={(event) => {
                        setEmail(event.currentTarget.value)
                        setError("")
                    }}
                />
            </div>
            <div className={style.button}>
                <Button
                    variant="light"
                    color="red"
                    size="sm"
                    fullWidth
                    onClick={handleSubmit}>
                    Login
                </Button>
            </div>
        </div>
    )
}
