import { Box, Button, Container, Typography } from "@mui/material"
import React from "react"

interface CoursesViewProps {
  email: string | null
  handleLogout: () => void
}

const CoursesView: React.FC<CoursesViewProps> = ({ email, handleLogout }) => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
        <Typography variant="h5" gutterBottom>
          Logged in as: {email}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  )
}

export default CoursesView
