import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Typography, Button } from '@material-ui/core';
import Links from '../../util/links';

const Home = props => (
    <Paper className={props.classes.homePaper}>
        <Typography variant="headline" component="h2">
            Welcome!
        </Typography>
        <Typography component="p">
            Welcome to the website of the Homerton Thinking Machine League!
            We&apos;re glad to have you here. We are the student run technology and Computer Science
            society of Homerton College at the University of Cambridge.
        </Typography>
        <Typography component="p">
            Our founding document set out three aims for the society:
            Support and bring together those studying Computer Science at Homerton from all years
            Put on events for anybody interested in technology, or learning more about technology
            at Homerton. Promote applying to study Computer Science at Homerton and help freshers
            settle into the study of the CST.
        </Typography>
        <Typography component="p">
            Here on our website you can find out information about all of our events, and learn
            more about studying Computer Science at Homerton and the University of Cambridge from
            students. You can also find out about how we are governed and who to contact if you
            want to come and speak to our members. We&apos;re happy to hear from any technology
            company or speaker with an interesting topic to talk to us about. So what are you
            waiting for? Sign up to hear about our events by clicking the big blue button...
        </Typography>
        <div className={props.classes.signUpButtonWrapper}>
            <span className={props.classes.flex} />
            <Button
                href={Links.signup}
                color="primary"
                variant="contained"
                className={props.classes.signUpButton}
            >
                <Typography color="inherit" component="h3">
                    Sign up
                </Typography>
            </Button>
            <span className={props.classes.flex} />
        </div>
    </Paper>
);

Home.propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const styles = theme => ({
    homePaper: {
        padding: theme.spacing.unit * 3,
    },
    signUpButtonWrapper: {
        display: 'flex',
        width: '100%',
    },
    signUpButton: {
        margin: 'auto',
        padding: theme.spacing.unit * 3,
    },
    flex: {
        flex: 1,
    },
});

export default withStyles(styles)(Home);
