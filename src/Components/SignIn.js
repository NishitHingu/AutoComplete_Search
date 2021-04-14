import React, { useContext, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { AuthContext } from "../Context/AuthContext";
import { useHistory } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "100%",
  },
  submit: {
    //   width: "100%",
  },
  home: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  },
  mainBackground: {
    height: "100%",
    backgroundColor: "hsl(225,14%,95%)",
  },
  sideBackdrop: {
    height: "100%",
    background: `transparent
			url('https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?cs=srgb&dl=pexels-fauxels-3183153.jpg&fm=jpg')
			no-repeat 
			center`,
    backgroundSize: "cover",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center,",
  },
  bgContainer: {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  boxShadow: {
    boxShadow: "1px 2px 25px hsl(230, 4%, 85%)",
  },
  switch: {
    margin: "1rem auto",
  },
  blueText: {
    paddingLeft: "0.25rem",
    color: theme.palette.info.dark,
    cursor: "pointer",
  },
  google: {
    backgroundColor: "#303546",
    color: "white",
    "&:hover" : {
      backgroundColor: "#353a4d",
    }
  },
}));

const SignIn = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    signIn(email, password)
      .then((newUser) => {
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };
  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    history.push("/");
  };

  const changePassVisibility = () => {
    setShowPassword(!showPassword);
  };

  const goSignUp = () => history.push("/signUp");

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <IconButton aria-label="home" className={classes.home}>
        <HomeIcon onClick={() => history.push("/")} />
      </IconButton>
      <Grid item xs={false} md={5} className={classes.bgContainer}>
        <div className={classes.sideBackdrop}></div>
      </Grid>
      <Grid item xs={12} md={7} className={classes.mainBackground}>
        <Grid
          container
          style={{ height: "100%" }}
          justify="center"
          alignItems="center"
        >
          <Grid item xs={10} sm={8}>
            <Paper className={classes.boxShadow} elevation={0} style={{ padding: "2rem 0" }}>
              <form
                className={classes.formContainer}
                noValidate
                autoComplete="off"
              >
                <Grid
                  container
                  spacing={3}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={10}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setEmail(e.target.value)}
                    ></TextField>
                  </Grid>
                  <Grid item xs={10}>
                    <FormControl style={{ width: "100%" }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        labelWidth={70}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={changePassVisibility}
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body2" color="error">
                      {error}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Button
                      variant="contained"
                      className={classes.submit}
                      fullWidth
                      color="primary"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Sign-In
                    </Button>
                  </Grid>
                  <Grid item xs={10}>
                    <Button
                      variant="contained"
                      className={classes.google}
                      fullWidth
                      onClick={handleGoogleSignIn}
                    >
                      Google
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <Typography
                variant="body2"
                align="center"
                className={classes.switch}
              >
                Don't have a account?
                <Typography
                  color="primary"
                  variant="body2"
                  component="span"
                  onClick={goSignUp}
                  className={classes.blueText}
                >
                  Sign-Up
                </Typography>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignIn;
