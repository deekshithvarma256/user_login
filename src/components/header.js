import React, { useRef, useState } from "react";
import { StyledHeader } from "../StyledApp";
import logo from "..//assets/logo.svg";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import {
  Avatar,
  ClickAwayListener,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import CustomModal from "./CustomModal";
function Header(props) {
  const imgurl = props?.user?.image;
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const anchorRef = useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const menu = () => {
    return (
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  style={{ padding: 0 }}
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  <MenuItem onClick={() => setModal(props?.user)}>
                    Profile
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    );
  };
  return (
    <StyledHeader container>
      <Grid className="logo" item xs={6}>
        <img src={logo} alt="logo" className='logoimg'/>
        LOGo
      </Grid>
      <div className="user-profile" item xs={6} onClick={() => setOpen(!open)}>
        <Avatar
          sx={{ width: 32, height: 32 }}
          src={imgurl}
          alt={props?.user?.name}
        />
        <span className="userText" ref={anchorRef}>
          {props?.user?.name}
        </span>
        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        {menu()}
      </div>
      <CustomModal open={modal} setOpen={setModal} />
    </StyledHeader>
  );
}

export default Header;
