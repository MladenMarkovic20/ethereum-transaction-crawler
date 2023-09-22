import { Box, Button, Typography } from "@mui/material";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import { Transaction } from "../interface/Transaction";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";

export function PopperPopupState({
  transaction,
  handleCopyToClipboard,
  hoveredContent,
}: {
  transaction: Transaction;
  handleCopyToClipboard: any;
  hoveredContent: any;
}) {
  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState: any) => (
        <div>
          <Box
            sx={{
              p: "5px",
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              {...bindToggle(popupState)}
              sx={{ fontSize: "5px" }}
            >
              See full transaction hash
            </Button>
            <Button
              variant="contained"
              {...bindToggle(popupState)}
              sx={{ fontSize: "5px" }}
              onClick={handleCopyToClipboard}
            >
              Copy to clipboard
            </Button>
          </Box>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography sx={{ p: 1, fontSize: "12px" }}>
                    Full context: {hoveredContent}
                  </Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}
