import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Hidden, Typography } from '@material-ui/core';
import Page from '../util/pages';
import Header from './header/Header';
import { Home, Events, Committee, StudyHom, Privacy } from './pages';
import background from '../res/Homerton.jpg';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentPage: Page.home,
        };
    }

    handlePageChange(newPage) {
        this.setState({ currentPage: newPage });
    }

    render() {
        return (
            <React.Fragment>
                <div className={this.props.classes.background} />
                <Header
                    page={this.state.currentPage}
                    handlePageChange={newPage => this.handlePageChange(newPage)}
                />
                <div className={this.props.classes.content}>
                    <Hidden mdUp>
                        <Typography variant="title" color="inherit" className={this.props.classes.mobilePageHeader}>
                            {Page.getPageLabel(this.state.currentPage)}
                        </Typography>
                    </Hidden>
                    {(() => {
                        switch (this.state.currentPage) {
                        case Page.home: return <Home />;
                        case Page.events: return <Events />;
                        case Page.committee: return <Committee />;
                        case Page.studyHom: return <StudyHom />;
                        case Page.privacy: return <Privacy />;
                        default: return null;
                        }
                    })()}
                </div>
            </React.Fragment>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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

export default withStyles(styles)(App);
