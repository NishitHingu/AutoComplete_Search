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
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "100%",
  },
  boxShadow: {
    boxShadow: "1px 2px 25px hsl(230, 4%, 85%)",
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
  titleInfo: {
    height: "100%",
    backgroundColor: "hsla(225,14%,95%, 0.3)",
    textShadow: `0 0 20px #181818,
                4px 0 10px #181818,
                -4px 0 10px #181818,
                0 4px 10px #181818,
                0 -4px 10px #181818`,
  },
  bgContainer: {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  textShadow: {
    color: theme.palette.secondary[theme.palette.type],
    textShadow: `0 0 20px #181818,
    4px 0 10px #181818,
    -4px 0 10px #181818,
    0 4px 10px #181818,
    0 -4px 10px #181818`,
    // color: "#fff",
    paddingBottom: "2rem",
  },
  home: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  },
  switch: {
    margin: "1rem auto 0.5rem auto",
  },
  privacy: {
    margin: "0.5rem 2.5rem",
    fontSize: "12px",
    fontStyle: "italic",
  },
  blueText: {
    color: theme.palette.info.dark,
    cursor: "pointer",
  },
}));

const SignIn = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [error, setError] = useState("");
  const { signUp, loading, setLoading } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password === confirmPassword) {
      signUp(email, password)
        .then((newUser) => {
          history.push("/");
        })
        .catch((error) => {
          setError(error.message);
          console.log(error);
          setLoading(false);
        });
      setLoading(false);
    } else if (!fname || !lname) {
      setError("Please fill in valid credentials");
    } else {
      setError("Passwords do not match");
      setLoading(false);
    }
  };

  // Password Visibilty functions
  const changePassVisibility = () => {
    setShowPassword(!showPassword);
  };
  const changePassVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const goSignIn = () => history.push("/signIn");

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
        <div className={classes.sideBackdrop}>
          {/* <Typography
            variant="h2"
            component="span"
            className={classes.textShadow}
          >
            <IconButton
              edge="start"
              color="secondary"
              aria-label="menu"
              onClick={goHome}
            >
              <PolymerIcon />
            </IconButton>
            Conbi
          </Typography>
          <Typography variant="body1" className={classes.textShadow}>
            A 'Search Engine' for your data to help you analyze quickly and make
            data-driven decisions on-the-go
          </Typography> */}
        </div>
      </Grid>
      <Grid item xs={12} md={7} className={classes.mainBackground}>
        <Grid
          container
          style={{ height: "100%" }}
          justify="center"
          alignItems="center"
        >
          <Grid item xs={10} sm={8}>
            <Paper elevation={0} className={classes.boxShadow} style={{ padding: "2rem 0" }}>
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
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="First name"
                          variant="outlined"
                          value={fname}
                          onChange={(e) => setFname(e.target.value)}
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Last name"
                          variant="outlined"
                          value={lname}
                          onChange={(e) => setLname(e.target.value)}
                          fullWidth
                        ></TextField>
                      </Grid>
                    </Grid>
                  </Grid>
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
                    <FormControl style={{ width: "100%" }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword2 ? "text" : "password"}
                        labelWidth={70}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={changePassVisibility2}
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end"
                            >
                              {showPassword2 ? (
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
                      disabled={loading}
                      startIcon={<LockIcon />}
                    >
                      Create Accout
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <Typography variant="body2" align="center" className={classes.switch}>
                Already have a account?
                <Typography
                  className={classes.blueText}
                  component="span"
                  onClick={goSignIn}
                  style={{ cursor: "pointer", paddingLeft: "0.25rem" }}
                >
                  Sign-In
                </Typography>
              </Typography>
              <Typography variant="body2" align="center" className={classes.privacy}>
                By clicking Create account, you agree to our Terms and have read and acknowledge our 
                <span className={classes.blueText}> Privacy Statement</span>.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignIn;
