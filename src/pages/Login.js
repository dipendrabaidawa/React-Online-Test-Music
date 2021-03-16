import React from 'react';
import {Redirect} from 'react-router-dom'
import {Toaster} from '@blueprintjs/core'

import {
  TextField, 
  Typography, 
  Grid, 
  FormControlLabel,
  Checkbox,
  Container,
  Box,
  Button,
  Link,
  withStyles,
} from '@material-ui/core';
//import '../components/css/Login.css'
import OwnershipTag from '../components/OwnershipTag'
import styles from './styles'

class Login extends React.Component{
  
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      redirect: false
    }
  }
  onChangeUsername(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();     
   
    
  }
  render() {
    if(this.state.redirect === true)
    {
      return <Redirect to='/' />
    }

    const { classes } = this.props;

    return (
      <Container 
        className={classes.container}
        component="main" 
        maxWidth="xs" 
        justify="center"
      >
        <Toaster ref={(element) => this.toaster = element}/>
        <div>
          <h1 className={classes.header}>
            Sign in to your account
          </h1>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.email}
              onChange={this.onChangeUsername}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              size="large"
              type="submit"
              fullWidth
              variant="contained"
              onClick={this.onSubmit}
              className={classes.submit}
            >
            <Typography className={classes.buttonLbl}>Sign In</Typography>
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Register"}
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

export default withStyles(styles)(Login);
