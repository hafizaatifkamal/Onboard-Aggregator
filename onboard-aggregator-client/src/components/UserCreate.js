import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../store/user-action";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialstate = {
  userDetails: {
    firstname: "",
    lastname: "",
    mail: "",
    login: "",
    avatar: "",
    gender: "",
    designation: "",
  },
};

const UserCreate = () => {
  const [state, setState] = useState(initialstate);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classes = useStyles();

  const {
    userDetails: {
      firstname,
      lastname,
      mail,
      login,
      avatar,
      gender,
      designation,
    },
  } = state;

  const handleEvent = (event) => {
    setState({
      ...state,
      userDetails: {
        ...state.userDetails,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createUser(state.userDetails)).then((res) => {
      res && navigate("/");
    });
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          User
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstname"
                variant="outlined"
                required
                fullWidth
                label="First Name"
                onChange={handleEvent}
                value={firstname}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="lastname"
                label="Last Name"
                onChange={handleEvent}
                value={lastname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="mail"
                label="Email"
                onChange={handleEvent}
                value={mail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="login"
                label="Username"
                onChange={handleEvent}
                value={login}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="avatar"
                label="Avatar"
                onChange={handleEvent}
                value={avatar}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="gender"
                name="gender"
                variant="outlined"
                required
                fullWidth
                label="Gender"
                onChange={handleEvent}
                value={gender}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="designation"
                name="designation"
                variant="outlined"
                required
                fullWidth
                label="Designation"
                onChange={handleEvent}
                value={designation}
                autoFocus
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default UserCreate;
