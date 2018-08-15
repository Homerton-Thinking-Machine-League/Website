import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Typography } from '@material-ui/core';

const Events = props => (
    <Paper className={props.classes.paper}>
        <Typography variant="subheading">
            The events will appear here when we finialise the schedule.
        </Typography>
    </Paper>
);

Events.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const styles = theme => ({
    paper: {
        padding: 2 * theme.spacing.unit,
    },
});

export default withStyles(styles)(Events);
