import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Typography } from '@material-ui/core';
import marked from 'marked';

const StudyHom = props => (
    <Paper className={props.classes.homePaper}>

        <Typography
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: marked(`
Watch this space, we're going to make some resources to show you why you should come to
Homerton to study Computer Science.
                `),
            }}
        />
    </Paper>
);

StudyHom.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const styles = theme => ({
    homePaper: {
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 3,
        paddingLeft: theme.spacing.unit * 8,
        paddingRight: theme.spacing.unit * 8,
    },
});

export default withStyles(styles)(StudyHom);
