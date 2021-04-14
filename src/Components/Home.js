import {
  AppBar,
  Button,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { Autocomplete } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import PolymerIcon from "@material-ui/icons/Polymer";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import GetAppIcon from "@material-ui/icons/GetApp";
import { matchSorter } from "match-sorter";
import RenderResult from "./RenderResult";
import jsPDF from "jspdf";

// Employees Data

let data = [
  {
    "Employee ID": "1",
    "Employee Name": "John Snow",
    Salary: "30000",
    Designation: "Account Executive",
    State: "Maryland",
  },
  {
    "Employee ID": "2",
    "Employee Name": "Paul Das",
    Salary: "50000",
    Designation: "Sr. Manager",
    State: "Indiana",
  },
  {
    "Employee ID": "3",
    "Employee Name": "Ranjeet Kumar",
    Salary: "100000",
    Designation: "VP of Sales",
    State: "California",
  },
  {
    "Employee ID": "4",
    "Employee Name": "Rahul Dsouza",
    Salary: "20000",
    Designation: "Business Development Representative",
    State: "Arkansas",
  },
  {
    "Employee ID": "5",
    "Employee Name": "Greg Patterson",
    Salary: "45000",
    Designation: "Team Lead",
    State: "Idaho",
  },
];

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: "2rem",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    flexGrow: 1,
  },
  customOption: {
    marginBottom: "0.25rem",
  },
  name: {
    margin: "0",
    fontSize: "16px",
    fontWeight: "400",
  },
  desig: {
    fontSize: "12px",
    margin: "0",
  },
  download: {
    marginLeft: "1rem",
    backgroundColor: theme.palette.primary.dark,
    color: "#fffffe",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      boxShadow: "1px 2px 15px hsl(230, 4%, 85%)",
    },
  },
}));

const Home = (props) => {
  const { user, signOut } = useContext(AuthContext);
  const history = useHistory();
  const [searchTerms, setSearchTerms] = useState([]);
  const [result, setResult] = useState([]);
  // Used to send the complete data as result for the first render
  const [firstRender, setFirstRender] = useState(true);
  const [searchHistory, setSearchHistory] = useState([]);
  const theme = useTheme();

  // Modify the search results when search terms change

  function getUnique(arr, comp) {
    let unique = [];
    let uniqueObj = {};
    for (let i in arr) {
      let objId = arr[i][comp];
      if (uniqueObj[objId]) {
        uniqueObj[objId].weight = uniqueObj[objId].weight + 1;
      } else {
        uniqueObj[objId] = arr[i];
        uniqueObj[objId].weight = 1;
      }
    }

    for (let i in uniqueObj) {
      unique.push(uniqueObj[i]);
    }
    return unique;
  }

  function getUniqueSearchTerm(arr, comp) {
    let unique = [];
    let uniqueObj = {};
    for (let i in arr) {
      if (typeof arr[i] === "object") {
        let objId = arr[i][comp];
        uniqueObj[objId] = arr[i];
      } else {
        uniqueObj[arr[i]] = arr[i];
      }
    }

    for (let i in uniqueObj) {
      unique.push(uniqueObj[i]);
    }
    return unique;
  }

  const compare = (a, b) => {
    return a["weight"] < b["weight"] ? 1 : -1;
  };

  useEffect(() => {
    if (firstRender) {
      setResult(data);
      setFirstRender(false);
      return null
    }
      let ans = [];
      searchTerms.forEach((term) => {
        if (typeof term === "object") {
          ans.push(term);
        } else {
          let match = matchSorter(data, term, {
            keys: ["Employee Name", "Designation", "State"],
          });
          if (match) {
            match.forEach((el) => ans.push(el));
          }
        }
      });
      ans = getUnique(ans, "Employee ID"); // Removing duplicate search results
      ans.sort(compare); // sort to keep the most matching result on top
      setResult(ans);
      let newSearchHistory = [...searchHistory];
      newSearchHistory.push(searchTerms);
      setSearchHistory(newSearchHistory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerms]);

  // Searching function

  const filterOptions = (options, { inputValue }) => {
    let searchResult = matchSorter(options, inputValue, {
      keys: ["Employee Name", "Designation", "State"],
    });
    return searchResult;
  };

  const updateSearchTerm = (e, value) => {
    if (value.length !== searchTerms.length) {
      let ans = getUniqueSearchTerm(value, "Employee ID");
      setSearchTerms(ans);
    }
  };

  // Customized autoComplete
  const customOptions = (option) => {
    return (
      <div className={classes.customOption}>
        <h5 className={classes.name}>{option["Employee Name"]}</h5>
        <span className={classes.desig}>
          Designation: {option["Designation"]}
        </span>
      </div>
    );
  };

  // Render Tags
  const checkRender = (tags, option) => {
    let term = typeof option === "object" ? option["Employee ID"] : option;
    let ans = true;
    tags.forEach((item) => {
      if (item["Employee ID"]) {
        if (item["Employee ID"] === term) {
          ans = false;
        }
      } else if (item === term) {
        ans = false;
      }
    });
    return ans;
  };

  // Generate Random colors for the Chip element
  const getBgColor = (index) => {
    let random = index % 3;
    return theme.palette.tags.background[random];
  };
  const getTextColor = (index) => {
    let random = index % 3;
    return theme.palette.tags.text[random];
  };
  const renderTags = (value, getTagProps) => {
    let renderedTags = [];
    return value.map((option, index) => {
      if (checkRender(renderedTags, option)) {
        renderedTags.push(option);
        return (
          <Chip
            key={`tags-${index}`}
            variant="default"
            component="div"
            // color="secondary"
            style={{
              backgroundColor: `${getBgColor(index)}`,
              color: `${getTextColor(index)}`,
              border: `1px solid ${getTextColor(index)}`,
              fontWeight: "500",
            }}
            label={
              typeof option === "object" ? option["Employee Name"] : option
            }
            {...getTagProps({ index })}
          />
        );
      } else {
        return null;
      }
    });
  };

  // Log in handlers
  const handleSignIn = () => {
    history.push("/signIn");
  };
  const handleSignUp = () => {
    history.push("/signUp");
  };

  // Downloading results using jsPDF

  const handleResultDownload = () => {
    if (user) {
      console.log(result);
      const doc = new jsPDF({ unit: "px" });
      doc.setFont("times");
      doc.setFontSize("22");
      doc.text("Results", 10, 20);
      let x = 10;
      let y = 50;
      result.forEach((item) => {
        doc.setFontSize("16");
        doc.text(`Employee Name: ${item["Employee Name"]}`, x, y);
        y += 18;
        doc.setFontSize("14");
        doc.text(`Designation: ${item["Designation"]}`, x, y);
        y += 18;
        doc.text(`Salary: ${item["Salary"]}`, x, y);
        y += 18;
        doc.text(`Location: ${item["State"]}`, x, y);
        y += 30;
      });
      doc.save("Results.pdf");
    } else {
      alert("Please Login to Download the results");
    }
  };

  const getUserName = () => {
    let index = user.email.indexOf("@");
    return user.email.substr(0, index);
  };

  const classes = useStyle();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <PolymerIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Conbi
          </Typography>
          {user ? (
            <div className={classes.flex}>
              <Typography
                variant="body1"
                className={classes.flex}
                style={{ paddingRight: "1rem" }}
              >
                <AccountCircleRoundedIcon />
                <span style={{ paddingLeft: "0.5rem", cursor: "pointer" }}>
                  {getUserName()}
                </span>
              </Typography>
              <Button
                onClick={signOut}
                color="inherit"
                endIcon={<ExitToAppIcon />}
              >
                LogOut
              </Button>
            </div>
          ) : (
            <div className={classes.flex}>
              <Button onClick={handleSignIn} color="inherit">
                Sign-In
              </Button>
              <Button onClick={handleSignUp} color="inherit">
                Sign-up
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={false} sm={1}></Grid>
        <Grid item xs={9} sm={8}>
          <Autocomplete
            PaperComponent="Card"
            blurOnSelect={true}
            onChange={(e, value) => updateSearchTerm(e, value)}
            multiple
            id="tags-outlined"
            options={data}
            getOptionLabel={(options) => `${options["Employee Name"]}`}
            filterOptions={filterOptions}
            freeSolo
            renderTags={renderTags}
            renderOption={customOptions}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" placeholder="Search" />
            )}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton
            className={classes.download}
            onClick={handleResultDownload}
          >
            <GetAppIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider style={{marginTop: "2rem", marginBottom: "-2rem"}} />
      <RenderResult result={result} />
    </div>
  );
};

export default Home;
