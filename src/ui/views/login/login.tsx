import {
    Button,
    Drawer,
    FocusTrap,
    PinInput,
    rem,
    Text,
    TextInput,
    Title
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconAt } from "@tabler/icons-react"
import cn from "classnames"
import React, { useEffect, useState } from "react"

import { UserManager } from "~backend/managers"

import sharedStyles from "../../sharedStyles.module.scss"
import style from "./login.module.scss"

interface LoginViewProps {
    handleLogin: (email: string) => void
}

/**
 * View to display login steps.
 * Handles logic if extension is quit before login is completed.
 * @param handleLogin
 * @returns
 */
export const LoginView: React.FC<LoginViewProps> = ({ handleLogin }) => {
    const [email, setEmail] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [pinError, setPinError] = useState<boolean>(false)
    const [opened, { open, close }] = useDisclosure(false)

    const userManager = new UserManager()

    // On startup, check if validation window was previously open
    useEffect(() => {
        ;(async () => {
            if (await userManager.getValidationWindow()) {
                open()
                setEmail(await userManager.getEmail())
            }
        })()
    }, [])

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSubmit = async () => {
        if (!email) {
            setError("Email is required.")
            return
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email.")
            return
        }

        if (await userManager.getPassword(email)) {
            open()
            await userManager.setEmail(email) // Save email to storage if user exits extension
            await userManager.setValidationWindow(true) // Save validation window state
        }
    }

    const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />

    return (
        <div className={cn(style.login, sharedStyles.flexColumn)}>
            <Drawer
                opened={opened}
                onClose={async () => {
                    close()
                    setPinError(false)
                    await userManager.setValidationWindow(false)
                }}
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
                            <FocusTrap active={true}>
                                <PinInput
                                    size="sm"
                                    length={5}
                                    oneTimeCode
                                    placeholder=""
                                    error={pinError}
                                    type="number"
                                    onChange={async (event) => {
                                        // Check pin if all digits are entered
                                        if (event.length < 5) {
                                            setPinError(false)
                                        } else if (event.length === 5) {
                                            const pass =
                                                await userManager.validatePassword(
                                                    email,
                                                    event
                                                )
                                            if (pass.data) {
                                                // Pin was correct, login
                                                handleLogin(email)
                                                setEmail("")
                                            } else {
                                                setPinError(true)
                                            }
                                        }
                                    }}
                                />
                            </FocusTrap>
                        </div>
                        <div className={style.button}>
                            <Button
                                variant="light"
                                color="red"
                                size="sm"
                                fullWidth
                                onClick={async () => {
                                    await userManager.getPassword(email)
                                }}>
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
                <FocusTrap active={true}>
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
                </FocusTrap>
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
