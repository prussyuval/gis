import react, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";
import ServerRequest from "./helpers/ServerRequest";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const LogIn = ({setLoggedIn}) => {
    const classes = useStyles();

    // create state variables for each input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onClick = async () => {
        const data = {
          "email": email,
          "password": password,
        }

        const response = await ServerRequest.postWithUrl("https://lichluchit.com/api/login", data);
        if (response.data.data === "yes") {
            setLoggedIn(true);
        }

    };

    return (
        <div className="register-title-form">
            <Typography variant="h4" component="h4" className="register-title">
              Log In
            </Typography>
            <form className={classes.root}>
          <TextField
            label="Email"
            variant="filled"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div>
            <Button type="button" variant="contained" color="primary" onClick={async () => {await onClick()}}>
              LogIn
            </Button>
          </div>
        </form>
        </div>
    )
}

export default LogIn;