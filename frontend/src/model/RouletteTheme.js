import {createMuiTheme} from '@material-ui/core/styles';
import {red} from "@material-ui/core/colors";

export default createMuiTheme({
    palette: {
        primary: red,
    },
    typography: {
        useNextVariants: true,
    },
});
