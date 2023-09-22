import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const SquareButton = styled(Button)`
  min-width: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  &:hover {
    background-color: blue;
  }
`;

const TextInput = styled(TextField)`
  width: 700px;
  & .MuiOutlinedInput-root {
    border-radius: 20px;
  }
  &:hover {
    background-color: #f2f5f6;
    border-radius: 20px;
  }
`;

const SearchBar = ({ onSearch }: any) => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchInput);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <TextInput
        variant="outlined"
        placeholder="Search by address"
        size="medium"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyPress}
        InputProps={{
          endAdornment: (
            <SquareButton variant="contained" onClick={handleSearch}>
              <SearchIcon />
            </SquareButton>
          ),
        }}
      />
    </SearchContainer>
  );
};

export default SearchBar;
