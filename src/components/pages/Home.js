import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Typography, Button } from '@material-ui/core';
import marked from '../../util/markdown';
import Links from '../../util/externalUrls';

const Home = props => (
    <Paper className={props.classes.homePaper}>

        <Typography
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: marked(`
# Welcome

Hello freshers! On behalf of the whole HTML committee I'd like to welcome you to Homerton and
the University of Cambridge. Hopefully you'll enjoy your time here. If you're going to be studying
a Computer Science paper at any point, we're here to support you. The first you'll hear from us is
our freshers' squash which as a society which started last year is going to be an opportunity for
all members to meet and to get to know more people. If you want to learn to program whilst you're
here, we'll be running sessions for you. No matter if you're just interested in tech or want to
know more we're the society for you.

**Henry Wright**  
_HTML President (2018-19)_

---

# About us

We are the student run technology and Computer Science society of Homerton College.
Our main aims are:
* **Support and bring together**  those studying Computer Science at Homerton from all years
* **Put on events** for anybody interested in technology, or learning more
about technology at Homerton.
* **Promote** applying to study Computer Science at Homerton and help freshers settle
into the study of the CST.

So what are you waiting for? Sign up to hear about our events by clicking the big blue button...
                `),
            }}
        />
        <div className={props.classes.signUpButtonWrapper}>
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
        </div>
    </Paper>
);

Home.propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const styles = theme => ({
    homePaper: {
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 3,
        paddingLeft: theme.spacing.unit * 8,
        paddingRight: theme.spacing.unit * 8,
    },
    signUpButtonWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    signUpButton: {
        padding: theme.spacing.unit * 3,
    },
});

export default withStyles(styles)(Home);
