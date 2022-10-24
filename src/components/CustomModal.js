import * as React from "react";
import { Box, Avatar } from "@mui/material";
import { StyledModal } from "../StyledApp";
import { Grid } from "@material-ui/core";
import close from "../assets/close.svg";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "394px",
  height: "281px",
  boxShadow: "24px",
  margin: "30px",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
};

export default function CustomModal(props) {
  const { open, setOpen } = props;

  return (
    <div>
      <StyledModal
        open={!!open}
        onClose={() => setOpen(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            className="closeicon"
            onClick={() => setOpen(null)}
            src={close}
            alt="close"
          ></img>
          <Grid
            id="modal-modal-description"
            className="dataContainer"
            container
          >
            <Grid item xs={3}>
              <Avatar
                sx={{ width: 90, height: 90 }}
                src={open?.image}
                alt={open?.name}
              />
            </Grid>
            <Grid item xs={7}>
              <div className="text">Name : {open?.name}</div>
              <div className="text">Email : {open?.email}</div>
              <div className="text">Mo.No : {open?.phone}</div>
            </Grid>
          </Grid>
        </Box>
      </StyledModal>
    </div>
  );
}
