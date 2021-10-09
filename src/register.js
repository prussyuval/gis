import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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

const Form = ({ handleClose }) => {
  const classes = useStyles();
  // create state variables for each input
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClick = async () => {
      const data = {
          "first_name": firstName,
          "last_name": lastName,
          "email": email,
          "password": password,
      }

      await ServerRequest.postWithUrl("https://lichluchit.com/api/register", data);
    }

  return (
      <div className="register-title-form">
        <Typography variant="h4" component="h4" className="register-title">
          Register
        </Typography>
        <div className={classes.root}>
          <TextField
            label="First Name"
            variant="filled"
            required
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="filled"
            required
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
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
            <Button type="submit" variant="contained" color="primary" onClick={async () => {await onClick()}}>
              Signup
            </Button>
          </div>
        </div>
      </div>
  );
};

export default Form;