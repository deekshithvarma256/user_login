import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { Modal } from "@mui/material";

export const StyledApp = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-size: 16px;
  font-weight: 400;
  margin: 0px;
  height: 100vh;
  cursor: default;
`;
export const StyledLogin = styled(Grid)`
align-items:center;
justify-content: center;
height:100vh;
.btn.loading{
  cursor:wait;
}
.loginImg{
  height:100%;
  min-width:50vw;
  position: fixed;
}
.logingrid{
  height:100%;
}
.loginForm{
  margin:auto;
  width:350px;
}
.error{
  color: red;
  margin-top: 10px;
}
.register{
margin-top:66px;
}
.pb104{
padding-bottom:104px;
}
.font30{
  font-size: 30px;
font-weight: 700;
margin:0px 0px 13px 0px;
}
.btn{
  width:100%;
  margin: 20px 0px 30px 0px;
  background-color: #04C35C;
  text-transform: none;
&:hover{
  background-color: #04C35C;
}}
.mt{
  margin-top:0px;
}
.login{
  margin-top:145px;
}
.mb0{
  margin-bottom: 0px;
}
.mb11,.textfield {
  margin-bottom 11px;
}
.textfield{
  width: 100%;
}
.link{
  color:#2B6CB0;
}
.hidden{
  display:none;
}
.uploadFileImg{
  position: relative;
  top: 145px;
  right: 45px;
  background-color: white;
  border-radius: 50%;
}
.textcenter{
  text-align:center;
}
.MuiOutlinedInput-input{
  padding: 17px 14px;
}
.imageContainer{
  margin: 0px auto 40px;
  width:170px;
  height:170px;
  display:flex;
}
.avatar{
  width:100%;
  height:100%;
}
`;
export const StyledUserList = styled.div`
  width: 73vw;
  height: inherit;
  margin: auto;
  margin-top: 130px;

  .contianerTable {
    margin-top: 10px;
    height: 50%;
  }
  .searchbar {
    border-radius: 15px;
  }
  .MuiTableCell-body {
    font-family: "Mulish";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
  }
  .MuiTableCell-head {
    font-family: "Mulish";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    color: #9fa2b4;
  }
  .buttonAction {
    background-color: #f12b2c;
    color: #ffffff;
    padding: 5px 12px;
    border-radius: 100px;
    font-family: "Mulish";
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 13px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.5px;
    &:hover {
      background-color: #f12b2c;
    }
  }
  .user-avatar {
    width: 44px;
    margin-right: 21px;
  }
  .user-avatar-container {
    display: inline-flex;
    align-items: center;
  }
`;
export const StyledHeader = styled(Grid)`
  position: fixed;
  top: 0;
  padding: 20px 50px;
  .logo,
  .user-profile {
    width: fit-content;
    display: inline-flex;
    align-items: center;
  }
  .userLogo {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
  .user-profile {
    position: absolute;
    right: 30px;
    cursor: pointer;
  }
  .logo {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
  }
  .userText {
    margin: 0px 12px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
  }
  .MuiMenuItem-root{
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
  }
  .logoimg{
    margin-right:5px
  }
`;
export const StyledModal = styled(Modal)`
  .dataContainer {
    position: absolute;
    top: 30%;
    left: 45px;
    grid-gap: 16px;
    margin-top: 2px;
  }
  .text {
    margin-bottom: 10px;
    font-family: "Mulish";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
  }
  .closeicon {
    position: absolute;
    top: 7px;
    right: 13px;
  }
`;
