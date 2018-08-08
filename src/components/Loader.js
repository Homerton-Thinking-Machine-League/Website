import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, CircularProgress } from '@material-ui/core';

const Loader = props => <CircularProgress className={props.classes.progress} />;

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

Loader.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Loader);
