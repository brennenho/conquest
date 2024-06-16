import { Box, Button, Container, Typography } from "@mui/material"
import React from "react"

import { Subtitle } from "../../components"

interface HomeViewProps {
  email: string
  handleLogout: () => void
}

export const HomeView: React.FC<HomeViewProps> = ({ email, handleLogout }) => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
        <Subtitle text={`Welcome ${email}`} />
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  )
}
