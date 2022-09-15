import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import client from "../../utils/client";
import InputBase from "@mui/material/InputBase";
import { useState } from "react";

function SearchBar() {
  const [inputText, setInputText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchResponse, setSearchResponse] = useState(""); 

  // handle the text input to search bar
  const handleChange = event => {
    event.preventDefault();
    const { value } = event.target;
    setInputText({
      value,
    });
    console.log("search", inputText);
  };

  // handle onclick of button
  const submitSearch = () => {
    console.log("sub");
    client
      .get(`/users`)
      .then(res => {
        setSearchResponse(res.data);
        // this needs to be a filter or save the whole list of students and then filter one from that state
        setSearchResult(res.data.data.users);
        console.log('res', res);
      })

      .catch(err => console.log(err.response));
  };
  console.log('search', searchResult);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Box sx={{ backgroundColor: "white" }}>
        <InputBase
          onChange={handleChange}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Box>
      <Box>
        <Button onClick={submitSearch} variant="contained">
          Search User
        </Button>
      </Box>
    </Box>
  );
}

export default SearchBar;
