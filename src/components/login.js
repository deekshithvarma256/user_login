import React, { useEffect, useState } from "react";
import { Avatar, Button, Grid, TextField } from "@material-ui/core";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import loginImg from "../assets/loginImg.png";
import { StyledLogin } from "../StyledApp";
import upload from "../assets/upload.svg";
import userNoImg from "../assets/userNoImg.svg";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import moment from "moment";
import { db } from "./firebase";
import "firebase/auth";
import { COLLECTION, EMAIL_IN_USE, INCORRECT_LOGIN, UPLOAD_IMAGE } from "./constants";
function Login(props) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [register, setRegister] = useState(false);
  const [img, setImg] = useState(null);
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    if(error)setError('');
  }, [register])
  
  const uploadImg = async () => {
    if (!img) {
      setError(UPLOAD_IMAGE);
      return;
    }
    setLoading(true)
    const storage = getStorage();
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      "state_changed",
      (snap) => {
      },
      (error) => {
        console.log("Error: ", error);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          signupUser(downloadURL);
        });
      }
    );
  };
  const signupUser = async (url) => {
    const auth = getAuth();
    const date = moment(new Date()).format("MMM DD,yyyy");
    const uploadData = {
      name: name,
      email: email,
      phone: phone,
      image: url,
      date: date,
    };
    await createUserWithEmailAndPassword(auth, email, pwd).then(async()=>{await setDoc(doc(db, COLLECTION, email), uploadData);
    props?.setUser(uploadData);}).catch(err=>setError(EMAIL_IN_USE)).finally(setLoading(false));    
  };
  const getCurrentUser = async (email) => {
    const q = query(collection(db, COLLECTION), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const docData = querySnapshot.docs[0]._document.data.value.mapValue.fields;
    let userObj = {};
    if (docData) {
      Object.keys(docData).forEach((key) => {
        userObj[key] = Object.values(docData[key])[0];
      });
    }
    return userObj;
  };
  const authUser = async () => {
    const auth = getAuth();
    setLoading(true);
    const user = await signInWithEmailAndPassword(auth, email, pwd).catch(
      err => setError(INCORRECT_LOGIN)
    );
    
    if(error){setLoading(false);return;}
    const userData = await getCurrentUser(user?._tokenResponse?.email).then(setLoading(false));
    props?.setUser(userData);
  };
  const loginUser = () => {
    return (
      <div className='loginForm login'>
        <div className="mb0">Welcome back</div>
        <h2 className="font30">Login to your account</h2>
        <div className="mb11">Email</div>
        <TextField
          variant="outlined"
          id="email"
          className="textfield"
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <div className="mb11">Password</div>
        <TextField
          variant="outlined"
          id="pwd"
          className="textfield"
          type="password"
          placeholder="Enter password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        ></TextField>
        <Button
          variant="contained"
          className={`btn ${loading && 'loading'}`}
          color="secondary"
          onClick={() => authUser()}
        >
          Login
        </Button>
        <div>
          {" "}
          Dont have an account?{" "}
          <span className="link" onClick={() => setRegister(true)}>
            Register
          </span>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
    );
  };
  const handleImg = (e) => {
    if(error===UPLOAD_IMAGE)setError('');
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };
  const registerUser = () => {
    return (
      <div className="loginForm register">
        <div className="textcenter">
          <div className="font30">Create New Profile</div>
          <div className={"imageContainer"} id="imageContainer">
            {img ? (
              <Avatar
                src={URL.createObjectURL(img)}
                alt={name}
                className="avatar"
              />
            ) : (
              <img src={userNoImg} alt="userImg" className="avatar"></img>
            )}
            {!img && (
              <>
                <label className="uploadFile" htmlFor="uploadFile">
                  <img src={upload} alt="upload" className="uploadFileImg" />
                </label>
                <input
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => handleImg(e)}
                  name="uploadFile"
                  id="uploadFile"
                  type="file"
                  className="hidden"
                />
              </>
            )}
          </div>
        </div>
        <div className="mb11">Name</div>
        <TextField
          variant="outlined"
          id="name"
          className="textfield"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextField>
        <div className="mb11">Email</div>
        <TextField
          variant="outlined"
          id="email"
          className="textfield"
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <div className="mb11">Password</div>
        <TextField
          variant="outlined"
          id="pwd"
          className="textfield"
          type="password"
          placeholder="Enter password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        ></TextField>
        <div className="mb11">Phone Number</div>
        <TextField
          variant="outlined"
          id="phone"
          className="textfield"
          type="number"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></TextField>
        <Button
          variant="contained"
          className={`btn ${loading && 'loading'}`}
          color="secondary"
          onClick={() => uploadImg()}
        >
          Register Now
        </Button>
        <div className="pb104">
          Already have an account?{" "}
          <span className="link" onClick={() => setRegister(false)}>
            Login
          </span>{error && <div className="error">{error}</div>}
        </div>
      </div>
    );
  };
  return (
    <>
      <StyledLogin container>
        <Grid item xs={6} className="logingrid">
          <img src={loginImg} alt="loginImg" className="loginImg"></img>
        </Grid>
        <Grid item xs className="logingrid">
          {register ? registerUser() : loginUser()}
        </Grid>
      </StyledLogin>
    </>
  );
}
export default Login;
