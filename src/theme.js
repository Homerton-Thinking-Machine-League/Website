import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#182556',
        },
    },
    typography: {
        fontFamily: [
            'Menlo',
            'Inconsolata',
            'Courier',
            'monospace',
            'sans-serif',
        ],
    },
});

export default theme;
