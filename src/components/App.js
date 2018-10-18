import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { MuiThemeProvider, CssBaseline, withStyles, Hidden, Typography } from '@material-ui/core';
import ScrollToTop from './ScrollToTop';
import Page from '../util/pages';
import Header from './header/Header';
import NotificationLayer from './notifications/NotificationLayer';
import { Home, News, Events, Committee, Privacy } from './pages';
import appTheme from '../theme';
import background from '../res/Homerton.jpg';

const App = ({ classes, location }) => (
    <ScrollToTop location={location}>
        <MuiThemeProvider theme={appTheme}>
            <CssBaseline />
            <div className={classes.background} />
            <Header
                pages={['home', 'news', 'events', 'committee', 'comeAndCode']}
            />
            <div className={classes.content}>
                <Hidden mdUp>
                    <Typography
                        variant="title"
                        color="inherit"
                        className={classes.mobilePageHeader}
                    >
                        {Page.pageLabels[
                            Object.keys(Page.routes)
                                .find(page => Page.routes[page] === location.pathname)
                        ]}
                    </Typography>
                </Hidden>
                <NotificationLayer>
                    <Switch>
                        <Route exact path={Page.routes[Page.home]} component={Home} />
                        <Route path={Page.routes[Page.news]} component={News} />
                        <Route path={Page.routes[Page.events]} component={Events} />
                        <Route path={Page.routes[Page.committee]} component={Committee} />
                        <Route
                            path={Page.routes[Page.comeAndCode]}
                            component={() => { window.location = '/comeAndCode'; return null; }}
                        />
                        <Route path={Page.routes[Page.privacy]} component={Privacy} />
                    </Switch>
                </NotificationLayer>
            </div>
        </MuiThemeProvider>
    </ScrollToTop>
);

App.propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    // eslint-disable-next-line react/forbid-prop-types
    location: PropTypes.object.isRequired,
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
        maxWidth: 1200,
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
