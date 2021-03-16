import themes from '../theme'
const styles = theme => ({
  //############
  //DECIDER PAGE
  //############
  body: {
    display: 'flex',
    marginBottom: 250,
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
      marginBottom: 0,
    },
    justifyContent: 'center',
    maxWidth: '100%'
  },
  decideContainer: {
    width: '100%',
    margin: 'auto',
  },
  modeBtn: {
    borderRadius: 15,
    backgroundColor: themes.palette.trim.main,
    borderColor: themes.palette.secondary.main,
    marginRight: 20,
    marginLeft: 20,
    alignItems: 'center',
    width: 398,
    height: 456,
    '&:hover': {
      backgroundColor: themes.palette.trim.secondary,
    },
    '&:focus': { 
      outline: 'none', //removes border around object when clicking
    },
    [theme.breakpoints.down('sm')]: {
      width: 250,
      height: 250,
      marginBottom: 40,
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: 40,
      width: 270,
      height: 100,
    },
    },
  modeBtnLbl: {
    color: themes.palette.primary.main,
    fontFamily: 'Spartan',
    textAlign: 'center',
    fontSize: 45,
    paddingTop:30,
    '&:hover': {
      color: themes.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize:28,
      paddingTop: 10,
      
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 30,
      paddingTop: 26,
    },
  },
  descriptionLbl: {
    color: themes.palette.text.main,
    textAlign: 'center',
    fontSize: 18,
  },
  deciderLink: {
    textDecoration: 'none',
  },
  deciderHeader: {
    color: themes.palette.text.main,
    fontSize: 26,
    fontFamily: 'Spartan',
    fontWeight: 100,
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
    
  },
  deciderHeader2: {
    color: themes.palette.primary.main,
    fontSize: 26,
    fontFamily: 'Spartan ',
    fontWeight: 100,
    paddingTop: 10,
    paddingBottom: 10,
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
      
    },
  },
  modeBtnImage: {
    width: 250,
    height: 250,
    paddingTop: 25,
    marginLeft: 70,
    [theme.breakpoints.down('sm')] : {
      width: 175,
      height: 175,
      marginLeft: 35,
    },
  },
  decoLogo: {
    width: 425,
    height: 425,
    color: 'red',
  },
  //##################
  //LOGIN-REGISTRATION
  //##################
  adminContain: {
    backgroundColor: themes.palette.trim.main,
  },
  header: {
        fontFamily: 'sans-serif',
        fontSize: 32,
        textAlign: 'center',
       // color: themes.palette.primary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: themes.palette.secondary.main,
    alignItems: 'center',
    '&:hover': {
      backgroundColor: themes.palette.trim.secondary,
    },
  },
  buttonLbl: {
    color: 'white',
    textAlign: 'center',
  },
    
  formLbl: {
    marginTop: themes.spacing(3),
  },
 container: {
   backgroundColor: 'white',
 },
  //##############
  //TECHNIQUE PAGE
  //##############
  techniqueBody: {
    textAlign: 'center',
    margin: 'auto',
  },
  divider: {
    marginBottom: 20,
    backgroundColor: themes.palette.trim.secondary,
    marginTop: 20,
  },
  icons: {
    width: 300,
    height: 300,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 30,
    backgroundColor: themes.palette.trim.main,
    borderRadius: 30,
    alignItems: 'center',
    '&:hover': {
      backgroundColor: themes.palette.trim.secondary,
    },
    '&:focus': { 
      outline: 'none', //removes border around object when clicking
    },
    [theme.breakpoints.down('xs')] : {
      width: 120,
      height: 120,
      marginRight: 8,
      marginLeft: 8,
    }
  },
  iconLabel: {
    color: themes.palette.primary.main,
    paddingTop: 30,
    fontSize: 30,
    fontFamily: 'Spartan',
    [theme.breakpoints.down('xs')] : {
      fontSize: 13,
      paddingTop: 10,
    }
  },
  topIconGrid: {
    maxWidth: '100%',
    margin: 'auto',
  },
  midIconGrid: {
    maxWidth: '100%',
    margin: 'auto',
  },
  bottomIconGrid: {
    maxWidth: '100%',
  },
  iconImage: {
    width: 200,
    height: 200,
    paddingTop: 40,
    [theme.breakpoints.down('xs')] : {
      width: 70,
      height: 70,
      marginBottom: 0,
      paddingTop: 10,
      
    }

  },
  techniqueHeader: {
    fontFamily: 'Spartan',
    color: themes.palette.primary.main,
    marginTop: 10,
  },
  //#####################
  //ACTIVITY DRILL LABELS
  //#####################
  instruction: {
    color: themes.palette.primary.main,
  },
  //############
  //PROFILE PAGE
  //############
  profileHeader: {
    color: themes.palette.primary.main,
  },
  profileContainer: {
    backgroundColor: themes.palette.trim.main,
    textAlign: 'center',
    margin: 'auto',
    maxWidth: '50%',
  }
});

  export default styles;