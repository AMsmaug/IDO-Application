import { useState } from "react";
import "../components/Login/login.css";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [emailMessage, setEmailMessage] = useState(``);
  const [passwordValidation, setPasswordValidation] = useState(true);
  const [authMessage, setAuthMessage] = useState(``);
  const [isLoding, setIsLoding] = useState(false);

  const navigate = useNavigate();

  const handleEmailValidation = (value: string) => {
    setEmail(value);
    if (value === ``) {
      setEmailMessage(`This field is required!`);
    } else {
      if (/[a-z0-9]\w+@\w+\.\w+/.test(value)) {
        setEmailMessage(``);
        password.length !== 0 ? setAuthMessage(``) : null;
      } else {
        password.length !== 0 ? setAuthMessage(``) : null;
        setEmailMessage(`Invalid email!`);
      }
    }
  };

  const handlePassowrdValidation = (value: string) => {
    setPassword(value);
    email.length !== 0 ? setAuthMessage(``) : null;
    if (value === ``) {
      setPasswordValidation(false);
    } else {
      setPasswordValidation(true);
    }
  };

  const handleSubmission = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email === `` || password === ``) {
      email === ``
        ? setEmailMessage(`This field is required!`)
        : setPasswordValidation(false);
      password === ``
        ? setPasswordValidation(false)
        : setEmailMessage(`This field is required!`);
      setAuthMessage(`Please enter all the required information!`);
    } else {
      if (emailMessage !== ``) {
        setAuthMessage(`Please enter a valid email!`);
      } else {
        // make the request here
        setAuthMessage(``);
        setIsLoding(true);
        axios
          .post(`http://localhost:5199/api/Items/verifyCredentials`, {
            email,
            password,
          })
          .then((response) => {
            setIsLoding(false);
            Cookies.set(`token`, `Bearer ${response.data.result.token}`);
            window.sessionStorage.setItem(`email`, email);
            navigate(`/`);
          })
          .catch(() => {
            setIsLoding(false);
            setAuthMessage(`Incorrect Email Or Password!`);
          });
      }
    }
  };

  return (
    <Stack direction={`row`}>
      <Box
        width={`50%`}
        height={`100vh`}
        bgcolor={`#212121`}
        position={`relative`}
        display={{
          xs: "none",
          sm: "none",
          md: "flex",
          lg: "flex",
        }}
      >
        <Box
          sx={{
            width: `50%`,
            padding: 0,
            position: `absolute`,
            right: `0`,
            bottom: `0`,
          }}
        >
          <img
            src="../../public/images/Login_Dark/Man.svg"
            alt=""
            style={{ width: `100%` }}
          />
        </Box>
        <Box
          sx={{
            width: `20%`,
            padding: 0,
            position: `absolute`,
            left: `0`,
            bottom: `0`,
          }}
        >
          <img
            src="../../public/images/Login_Dark/Woman.svg"
            alt=""
            style={{ width: `100%` }}
          />
        </Box>
        <Box
          sx={{
            width: `50%`,
            padding: 0,
            position: `absolute`,
            left: `50%`,
            top: {
              xs: `15%`,
              sm: `15%`,
              md: `35%`,
              lg: `25%`,
            },
            transform: `translateX(-50%)`,
          }}
        >
          <img
            src="../../public/images/Logo@2x.png"
            alt=""
            style={{ width: `100%` }}
          />
        </Box>
      </Box>
      <Stack
        width={{
          xs: `100%`,
          sm: `100%`,
          md: `50%`,
          lg: `50%`,
        }}
        height={`100vh`}
        justifyContent={`center`}
        alignItems={`center`}
        sx={{
          backgroundImage: `linear-gradient(#764f96, #2d2b52)`,
        }}
      >
        <Box
          sx={{
            width: `250px`,
            padding: 0,
            position: `absolute`,
            left: `50%`,
            top: `70px`,
            transform: `translateX(-50%)`,
            display: {
              xs: `block`,
              sm: `block`,
              md: `none`,
              lg: `none`,
            },
            borderRadius: `12px`,
            overflow: `hidden`,
          }}
        >
          <img
            src="../../public/images/Logo@2x.png"
            alt=""
            style={{ width: `100%` }}
          />
        </Box>
        <Box>
          <Box position={`relative`}>
            <Typography
              variant="h1"
              color={`white`}
              fontSize={`40px`}
              mb={`120px`}
              fontFamily={`revert`}
              position={`absolute`}
              sx={{
                top: `-100px`,
                let: `0`,
              }}
            >
              Time To Work!
            </Typography>
            <form style={{ position: `relative` }} onSubmit={handleSubmission}>
              <div>
                <Stack direction={`row`} gap={`10px`}>
                  <label htmlFor="email" style={{ display: `block` }}>
                    Email
                  </label>
                </Stack>
                <input
                  type="text"
                  id="email"
                  style={{
                    width: `350px`,
                    borderRadius: `6px`,
                    border:
                      emailMessage.length === 0 ? `none` : `2px solid red`,
                    padding: `8px`,
                    marginTop: `5px`,
                    backgroundColor: `#212121`,
                    color: `white`,
                  }}
                  className="input-field"
                  onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleEmailValidation(event.target.value)
                  }
                  value={email}
                />
                <Typography
                  color={`red`}
                  sx={{
                    fontSize: `14px`,
                    marginTop: `5px`,
                  }}
                >
                  {emailMessage}
                </Typography>
              </div>
              <div>
                <Stack
                  direction={`row`}
                  alignItems={`center`}
                  mt={`10px`}
                  gap={`10px`}
                >
                  <label htmlFor="password" style={{ display: `block` }}>
                    Password
                  </label>
                </Stack>
                <input
                  type="password"
                  id="password"
                  style={{
                    width: `350px`,
                    borderRadius: `6px`,
                    border: passwordValidation ? `none` : `2px solid red`,
                    padding: `8px`,
                    marginTop: `5px`,
                    backgroundColor: `#212121`,
                    color: `white`,
                  }}
                  className="input-field"
                  onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handlePassowrdValidation(event.target.value)
                  }
                  value={password}
                />
                <Typography
                  color={`red`}
                  marginTop={`5px`}
                  fontSize={`14px`}
                  display={passwordValidation ? `none` : `block`}
                >
                  This field is requried!
                </Typography>
              </div>
              <Button
                variant="contained"
                sx={{
                  width: `100%`,
                  marginTop: `20px`,
                  borderRadius: `12px`,
                  bgcolor: `#b6a3c2`,
                  color: `#695c85`,
                  "&:hover": {
                    bgcolor: `#918896`,
                  },
                }}
                onClick={handleSubmission}
                type="submit"
              >
                Sign In
              </Button>
              <Typography
                mt={`15px`}
                width={`100%`}
                textAlign={`center`}
                color={`red`}
                position={`absolute`}
                left={`50%`}
                sx={{
                  transform: `translateX(-50%)`,
                }}
              >
                {authMessage}
              </Typography>
              <Box
                position={`absolute`}
                display={isLoding ? `flex` : `none`}
                justifyContent={`center`}
                alignItems={`center`}
                width={`100%`}
                bottom={`-70px`}
              >
                <CircularProgress color="warning" />
              </Box>
            </form>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};
