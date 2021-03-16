import { createMuiTheme } from '@material-ui/core/styles';
//all main colors for the app stored here
const theme = createMuiTheme({
    palette: {
        primary: {
            main:  '#f3e5ab', //gold
            hover: '#bdbdbd'
        },
        secondary: {
            // main: '#355e3b',
            main: '#430541', //purple
            hover: '#bdbdbd' //light gray
        },
        trim: {
            main: '#272127', //tile backgrounds
            secondary: '#484848', //dark gray
            third: '#262525' //darker gray
        },
        text: {
            main: '#ECECEC',
            secondary: '#7bb483',
        }
    },
});

export default theme;