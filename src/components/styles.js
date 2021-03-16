import themes from '../theme' //inporting color schemes from themes.js
const styles = theme => ({
 
//####################
 // TOP NAVIGATION BAR
 //###################
 toolbarButtons: {
    marginLeft: 'auto',
 },
 toolbarUsernameWrapper: {
   marginLeft: '60%',
 },
 toolbarUsername: {
    fontFamily: 'Spartan',
    fontSize: 20,
    color: themes.palette.primary.main,
 },
 navbar_body: {
   backgroundColor: themes.palette.secondary.main,
   zIndex: 1400,
 },
 titleLogo: {
  [theme.breakpoints.down('sm')]: {
    width: 100,
    height: 60,
  },
   '&:focus': { 
      outline: 'none', //removes border around object when clicking
    }
 },
 //#############
 //OWNERSHIP TAG
 //#############
 divider: {
    marginTop: 25,
    marginBottom: 10,
    color: themes.palette.primary.main,
  },

});
  export default styles;
