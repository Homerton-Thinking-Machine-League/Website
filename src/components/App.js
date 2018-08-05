import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { withStyles, Hidden, Typography } from '@material-ui/core';
import Page from '../util/pages';
import Header from './header/Header';
import NotificationLayer from './notifications/NotificationLayer';
import { Home, Events, Committee, StudyHom, Privacy } from './pages';
import background from '../res/Homerton.jpg';

const App = props => (
    <React.Fragment>
        <div className={props.classes.background} />
        <Header />
        <div className={props.classes.content}>
            <Hidden mdUp>
                <Typography
                    variant="title"
                    color="inherit"
                    className={props.classes.mobilePageHeader}
                >
                    {Page.pageLabels[
                        Object.keys(Page.routes)
                            .find(page => Page.routes[page] === props.history.location.pathname)
                    ]}
                </Typography>
            </Hidden>
            <NotificationLayer>
                <Switch>
                    <Route exact path={Page.routes[Page.home]} component={Home} />
                    <Route path={Page.routes[Page.events]} component={Events} />
                    <Route path={Page.routes[Page.committee]} component={Committee} />
                    <Route path={Page.routes[Page.studyHom]} component={StudyHom} />
                    <Route path={Page.routes[Page.privacy]} component={Privacy} />
                </Switch>
            </NotificationLayer>
        </div>
    </React.Fragment>
);

App.propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    history: PropTypes.shape({
        location: PropTypes.shape({
            pathname: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

const styles = theme => ({
    background: {
        zIndex: -1,
        display: 'block',
        position: 'fixed',
        height: '100%',
        width: '100%',
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    content: {
        maxWidth: 800,
        margin: 'auto',
        padding: 3 * theme.spacing.unit,
        [theme.breakpoints.up('md')]: {
            paddingTop: 75 + (3 * theme.spacing.unit),
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: 50 + (3 * theme.spacing.unit),
        },
    },
    mobilePageHeader: {
        paddingBottom: 3 * theme.spacing.unit,
    },
});

export default withStyles(styles)(withRouter(App));
