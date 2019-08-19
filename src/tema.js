import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import common from '@material-ui/core/colors/common';
import yellow from '@material-ui/core/colors/amber';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      light: common['black'],
      main: common['black'],
      dark: common['black']
    },
    secondary: {
      light: yellow[300],
      main: yellow[500],
      dark: yellow[700]
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#ccc',
    },
  },
});

export default theme;
