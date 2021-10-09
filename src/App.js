import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import TableChartIcon from '@material-ui/icons/TableChart';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import '@fontsource/roboto';

import volcano from './volcano.png';
import './App.scss';
import VolcanoTable from './table';
import HomePage from './home';
import Volcano from "./volcano";
import Register from "./register";
import LogIn from "./login";

const VDrawer = () => {
  const [state, setState] = React.useState(false);
  let history = useHistory();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  const setRouter = (path) => {
      history.push(path);
  }

  return (
    <div>
      <React.Fragment key="left">
          <Button onClick={toggleDrawer(true)}>
              <MenuIcon style={{fill: "black"}}/>
          </Button>
          <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
            <div
              className="nav-bar"
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                <ListItem button key="Home" onClick={() => setRouter("/gis/")}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button key="Table" onClick={() => setRouter("/gis/table")}>
                    <ListItemIcon>
                        <TableChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Table" />
                  </ListItem>
              </List>
              <Divider />
              <List>
                  <ListItem button key="Register" onClick={() => setRouter("/gis/register")}>
                    <ListItemIcon>
                        <VpnKeyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Register" />
                  </ListItem>
              </List>
            </div>
          </Drawer>
        </React.Fragment>
    </div>
  );
};


const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(223, 71, 89)",
    },
    secondary: {
      main: "rgb(223, 71, 89)",
    },
  },
});

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    console.log("loggedIn: ", loggedIn);
    return (
     <ThemeProvider theme={theme}>
        <Router>
            <div className="App">
              <div className="header">
                  <VDrawer />
                  <img src={volcano} width="25px" alt=""/>
                  Volcano
              </div>
                <Switch>
                  <Route exact path="/gis/">
                    <HomePage />
                  </Route>
                  <Route path="/gis/table">
                      {loggedIn ? <VolcanoTable /> : <LogIn setLoggedIn={setLoggedIn} />}
                  </Route>
                  <Route path="/gis/volcano/:id">
                      {loggedIn ? <Volcano /> : <LogIn setLoggedIn={setLoggedIn} />}
                  </Route>
                  <Route path="/gis/register">
                      <Register />
                  </Route>
                </Switch>
            </div>
        </Router>
    </ThemeProvider>
  );
}

export default App;
