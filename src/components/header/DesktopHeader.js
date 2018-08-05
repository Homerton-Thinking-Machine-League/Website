import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { withStyles, AppBar, Tabs, Tab, Toolbar } from '@material-ui/core';
import Page from '../../util/pages';
import ExternalURLs from '../../util/externalUrls';
import { Facebook, Github } from '../Svg';
import logo from '../../res/logo.png';

const DesktopHeader = props => (
    <AppBar position="fixed">
        <Toolbar>
            <img src={logo} alt="logo" className={props.classes.logo} />
            <Tabs
                value={props.history.location.pathname}
            >
                {['home', 'events', 'committee', 'studyHom'].map(pageName => Page[pageName])
                    .map(page => (
                        <Tab
                            key={page}
                            value={Page.routes[page]}
                            color="inherit"
                            label={Page.pageLabels[page]}
                            icon={Page.pageIcons[page]}
                            component={Link}
                            to={Page.routes[page]}
                        />
                    ))
                }
            </Tabs>

            <div className={props.classes.expandFlex} />

            <Tab
                className={props.classes.socialMediaTab}
                href={ExternalURLs.facebook}
                icon={<Facebook />}
            />
            <Tab
                className={props.classes.socialMediaTab}
                href={ExternalURLs.github}
                icon={<Github />}
            />
        </Toolbar>
    </AppBar>
);

DesktopHeader.propTypes = {
    history: PropTypes.shape({
        location: PropTypes.shape({
            pathname: PropTypes.string,
        }).isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const styles = theme => ({
    logo: {
        padding: theme.spacing.unit,
        width: '120px',
    },
    expandFlex: {
        flex: 1,
    },
    socialMediaTab: {
        minWidth: 0,
        padding: theme.spacing.unit,
    },
});

export default withStyles(styles)(withRouter(DesktopHeader));
