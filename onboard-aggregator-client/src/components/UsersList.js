import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listUsers, updateUser } from "../store/user-action";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const UsersList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userDetails);
  const classes = useStyles();

  const [checkStatus, setCheckStatus] = useState(false);

  useEffect(() => {
    dispatch(listUsers());
  }, [checkStatus]);

  // Blocking redmine users
  const BlockUser = (users) => {
    const temp = {
      rm_id: users.rm_id,
      status: 3,
    };

    dispatch(updateUser(users._id, temp));
    setCheckStatus(!checkStatus);
  };

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Redmine Users
              </Typography>
            </Box>
            <Box>
              <Link to="/create">
                <Button variant="contained" color="primary">
                  CREATE USER
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="center">Avatar</TableCell>
                  <TableCell align="left">First Name</TableCell>
                  <TableCell align="left">Last Name</TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="left">Designation</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users.map((users, index) => (
                    <TableRow key={index}>
                      {users.status === 1 && (
                        <>
                          <TableCell align="right">{users.rm_id}</TableCell>
                          <TableCell align="center">
                            <Box display="flex" justifyContent="center">
                              <Avatar src={users.avatar} />
                            </Box>
                          </TableCell>
                          <TableCell align="left">{users.firstname}</TableCell>
                          <TableCell align="left">{users.lastname}</TableCell>
                          <TableCell align="left">{users.login}</TableCell>
                          <TableCell align="left">
                            {users.designation}
                          </TableCell>
                          <TableCell align="center">
                            <ButtonGroup
                              color="primary"
                              aria-label="outlined primary button group"
                            >
                              <Button onClick={() => BlockUser(users)}>
                                Block
                              </Button>
                            </ButtonGroup>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
};

export default UsersList;
