import { Box, Button, Container, TextField, Typography } from "@mui/material"
import React, { useState } from "react"

import { Subtitle } from "../../components"

interface LoginViewProps {
  handleLogin: (email: string) => void
}

export const LoginView: React.FC<LoginViewProps> = ({ handleLogin }) => {
  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<string>("")

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

    handleLogin(email)
  }

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
        <Subtitle text="Conquest" />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Container>
  )
}
