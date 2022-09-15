import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import client from "../../utils/client";
import InputBase from "@mui/material/InputBase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [inputText, setInputText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchResponse, setSearchResponse] = useState(""); 

  const navigate = useNavigate()

  // handle the text input to search bar
  const handleChange = event => {
    event.preventDefault();
    const { value } = event.target;
    setInputText({
      value,
    });
    console.log("search1", inputText);
  };

  // handle onclick of button
  const submitSearch = () => {

    client
      .get(`/users`)
      .then(res => {
        setSearchResponse(res.data);

        const users = res.data.data.users
        console.log('users:',users)
        console.log('input:', inputText)

        const foundUser = users.filter(user => user.first_name.includes(inputText.value)) 

        console.log('found', foundUser);

        setSearchResult(foundUser);
        console.log('res', res);
      })

      .catch(err => console.log(err.response));
  };
console.log('serach2', searchResult);
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
