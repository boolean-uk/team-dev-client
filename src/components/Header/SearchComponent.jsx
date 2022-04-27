import { Box } from "@mui/system"
import Button from "@mui/material/Button"
import InputBase from "@mui/material/InputBase"
import { useEffect, useState } from "react"

export function SearchComponent({handleSubmit}) {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}
    >
      <form className="search-form" onSubmit={handleSubmit}>
        <Box sx={{ backgroundColor: "white" }}>
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Box>
        <Box>
          <Button variant="contained">Search User</Button>
        </Box>
      </form>
    </Box>
  )
}
