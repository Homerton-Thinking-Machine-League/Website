import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, CircularProgress } from '@material-ui/core';

const Loader = ({ classes }) => (
    <div className={classes.wrapper}>
        <CircularProgress className={classes.progress} />
    </div>
);

const styles = theme => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

Loader.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Loader);
