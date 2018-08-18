import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper } from '@material-ui/core';

const PaddedPaper = (props) => {
    const { className, classes, ...propagateProps } = props;
    return (
        <Paper
            {...propagateProps}
            className={`${className} ${classes.paddedPaper}`}
        >
            {props.children}
        </Paper>
    );
};

PaddedPaper.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    children: PropTypes.node,
};

PaddedPaper.defaultProps = {
    className: '',
    children: null,
};

const styles = theme => ({
    paddedPaper: {
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 3,
        [theme.breakpoints.up('md')]: {
            paddingLeft: theme.spacing.unit * 8,
            paddingRight: theme.spacing.unit * 8,
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing.unit * 3,
            paddingRight: theme.spacing.unit * 3,
        },
    },
});

export default withStyles(styles)(PaddedPaper);
