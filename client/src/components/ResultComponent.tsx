/* eslint-disable react/jsx-no-undef */
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchData, postNewData, removeData } from "../services/api";
import SearchBar from "./SearchBar";
import ErrorPage from "./ErrorPage";
import { Transaction } from "../interface/Transaction";
import { PopperPopupState } from "../helpers/PopperPopupState";

const StyledContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px
  text-align: center;
  padding: 20px;
  gap: 20px;
  overflow-x: hidden; /* Turn off the horizontal slider */
  padding-right: 50px; /* Add right padding */
  padding-left: 50px; /* Add left padding */
  margin-top: 20px; /* Add top margin */
  margin-bottom: 20px; /* Add bottom margin */
`;

const StyledButton = styled(Button)`
  margin-top: 1rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTableHeader = styled.th`
  padding: 0.5rem;
  font-family: "lucida sans unicode", "lucida grande", sans-serif;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1.5px;
  line-height: 20px;
`;

const blue = {
  500: "#E6F5FB",
  600: "#0072E5",
  700: "#0059B2",
};

const StyledTableCell = styled.td`
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
  padding: 0.5rem;
  cursor: pointer;
  transition: max-width 0.3s;
  font-family: "trebuchet MS", sans-serif;
  color: #000000;
  font-style: italic;
  font-weight: bold;
  font-variant: normal;
  text-align: center;
  letter-spacing: 0.5px;
  line-height: 13px;
  border-top: 1px groove rgba(59, 46, 46, 0.1);
  border-bottom: 1px groove rgba(59, 46, 46, 0.1);

  &:hover {
    background-color: ${blue[500]};
  }
`;

const ResultComponent = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [hoveredContent, setHoveredContent] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    removeData();
  }, []);

  useEffect(() => {
    fetchData("/transactions")
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        setErrorMessage("Error fetching data. Please try again later.");
      });
    return () => {
      setDataLoaded(false);
    };
  }, [dataLoaded]);

  const updateDatabase = async (
    walletAddressFromInput: string,
    page: number
  ) => {
    try {
      await postNewData("/update-database", {
        walletAddress: walletAddressFromInput,
        page: page,
      });
    } catch (error) {
      setErrorMessage("Error updating database. Please try again later.");
    }
  };

  const handleMouseOver = (hash: string) => {
    setHoveredContent(hash);
    setHoveredCell(hash);
  };

  const handleMouseOut = () => {
    setHoveredContent(null);
    setHoveredCell(null);
  };

  const handleCopyToClipboard = () => {
    if (hoveredContent) {
      navigator.clipboard.writeText(hoveredContent);
    }
  };

  return (
    <div>
      {errorMessage ? (
        <ErrorPage errorMessage={errorMessage} />
      ) : (
        <div>
          <SearchBar
            onSearch={async (inputValue: string) => {
              setWalletAddress(inputValue);
              await updateDatabase(inputValue, 1);
              setDataLoaded(true);
            }}
          />
          <StyledContainer>
            <StyledTable>
              <thead>
                <tr>
                  <StyledTableHeader>Transaction Hash</StyledTableHeader>
                  <StyledTableHeader>Method</StyledTableHeader>
                  <StyledTableHeader>Block</StyledTableHeader>
                  <StyledTableHeader>Date Time (UTC)</StyledTableHeader>
                  <StyledTableHeader>From</StyledTableHeader>
                  <StyledTableHeader>To</StyledTableHeader>
                  <StyledTableHeader>Value</StyledTableHeader>
                  <StyledTableHeader>Txn Fee</StyledTableHeader>
                </tr>
              </thead>
              <tbody>
                {data.length > 0
                  ? data.map((transaction: Transaction) => (
                      <tr key={transaction.hash}>
                        <StyledTableCell
                          onMouseOver={() => handleMouseOver(transaction.hash)}
                          onMouseOut={handleMouseOut}
                          style={{
                            backgroundColor:
                              hoveredCell === transaction.hash
                                ? `${blue[500]}`
                                : "",
                          }}
                        >
                          <>
                            {transaction.hash}
                            {hoveredCell === transaction.hash && (
                              <PopperPopupState
                                transaction={transaction}
                                handleCopyToClipboard={handleCopyToClipboard}
                                hoveredContent={hoveredContent}
                              />
                            )}
                          </>
                        </StyledTableCell>
                        <StyledTableCell>{transaction.method}</StyledTableCell>
                        <StyledTableCell>
                          {transaction.blockNumber}
                        </StyledTableCell>
                        <StyledTableCell>
                          {transaction.timeStamp.toString()}
                        </StyledTableCell>
                        <StyledTableCell
                          onMouseOver={() => handleMouseOver(transaction.from)}
                          onMouseOut={handleMouseOut}
                        >
                          {transaction.from}
                          {hoveredCell === transaction.from && (
                            <PopperPopupState
                              transaction={transaction}
                              handleCopyToClipboard={handleCopyToClipboard}
                              hoveredContent={hoveredContent}
                            />
                          )}
                        </StyledTableCell>
                        <StyledTableCell
                          onMouseOver={() => handleMouseOver(transaction.to)}
                          onMouseOut={handleMouseOut}
                        >
                          <>
                            {transaction.to}
                            {hoveredCell === transaction.to && (
                              <PopperPopupState
                                transaction={transaction}
                                handleCopyToClipboard={handleCopyToClipboard}
                                hoveredContent={hoveredContent}
                              />
                            )}
                          </>
                        </StyledTableCell>
                        <StyledTableCell>{transaction.value}</StyledTableCell>
                        <StyledTableCell>{transaction.txnFee}</StyledTableCell>
                      </tr>
                    ))
                  : null}
              </tbody>
            </StyledTable>

            {data.length > 0 ? (
              <StyledButton
                variant="contained"
                color="primary"
                value={page}
                onClick={async () => {
                  const nextPage = page + 1;
                  setPage(nextPage);

                  if (!dataLoaded) {
                    await updateDatabase(walletAddress, nextPage);
                    setDataLoaded(true);
                  }
                }}
              >
                Load New Data
              </StyledButton>
            ) : null}
          </StyledContainer>
        </div>
      )}
    </div>
  );
};

export default ResultComponent;
