import React from 'react';
import {
    TextField, 
    Typography, 
    Grid, 
    Container,
    Box,
    Button,
    Link,
    withStyles,
} from '@material-ui/core';
import styles from './styles';
import OwnershipTag from '../components/OwnershipTag';
import {Toaster} from '@blueprintjs/core'

import {Redirect} from 'react-router-dom'

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.sendToCollection = this.sendToCollection.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      password2: '',
      email: '',
      redirect: false
    }

  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }
  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangePassword2(e) {
    this.setState({
      password2: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }  

  onSubmit(e) {
    e.preventDefault(); 
    
  }

  //stores user info into a document titled by their UID
  sendToCollection(){

   }
  render() {
    if(this.state.redirect === true)
    {
      return <Redirect to='/'/>
    }

    const { classes } = this.props;

    return (
      <Container 
        className={classes.container}
        component="main" 
        maxWidth="sm" 
        justify="center"
      >
        <Toaster ref={(element) => this.toaster = element}/>
        <div>
          <Typography className={classes.header}>
            Create your account
          </Typography>
          <form noValidate onSubmit = {this.addUser}>
          <Typography className={classes.formLbl}>Enter first name:</Typography>
            <TextField
              onSubmit={this.onSubmit}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="first-name"
              label="Enter first name"
              name="first-name"
              autoFocus
              value={this.state.firstName}
              onChange={this.onChangeFirstName}
            />
          <Typography className={classes.formLbl}>Enter last name:</Typography>
          <TextField
              onSubmit={this.onSubmit}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="last-name"
              label="Enter last name"
              type="last-name"
              id="last-name"
              value={this.state.lastName}
              onChange={this.onChangeLastName}
            />
          <Typography className={classes.formLbl}>Enter a username:</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="username"
              label="Enter a username"
              type="username"
              id="username"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          <Typography className={classes.formLbl}>Enter a password:</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
            <Typography className={classes.formLbl}>Confirm password:</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={this.state.password2}
              onChange={this.onChangePassword2}
            />
            <Typography className={classes.formLbl}>Enter an email address: </Typography>
            <TextField             
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              label="Enter an email address"
              type="email"
              id="email"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
            <Button
              size="large"
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={this.onSubmit}
            >
            <Typography className={classes.buttonLbl}>Create</Typography>
            </Button>
            <Grid container>
              <Grid item xs>
              <Typography>
                  Already have an account? 
                </Typography>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Login here"}
                </Link>
              </Grid>
            </Grid>
          </form>

          <OwnershipTag />
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    ); 
  }
}

export default withStyles(styles)(Register);
