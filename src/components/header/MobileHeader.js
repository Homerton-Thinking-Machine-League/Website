import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import {
    withStyles, AppBar, Drawer, MenuList, MenuItem, ListItem, ListItemIcon,
    ListItemText, Divider, IconButton, Typography, Toolbar,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import Page from '../../util/pages';
import Links from '../../util/externalUrls';
import { Facebook, Github } from '../Svg';

class MobileHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            drawerOpen: false,
        };
    }

    handleDrawerToggle() {
        this.setState(prevState => ({ drawerOpen: !prevState.drawerOpen }));
    }

    render() {
        return (
            <React.Fragment>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            onClick={() => this.handleDrawerToggle()}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography color="inherit" variant="title">
                            The HTML
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={this.state.drawerOpen}
                    onClose={() => this.handleDrawerToggle()}
                    classes={{
                        paper: this.props.classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <MenuList>
                        {this.props.pages.map(pageName => Page[pageName])
                            .map(page => (
                                <Route key={page} path={Page.routes[page]}>
                                    {({ match }) => (
                                        <Link to={Page.routes[page]}>
                                            <MenuItem
                                                key={page}
                                                selected={match != null && match.isExact}
                                                onClick={() => this.handleDrawerToggle()}
                                            >
                                                <ListItemIcon>{Page.pageIcons[page]}</ListItemIcon>
                                                <ListItemText>{Page.pageLabels[page]}</ListItemText>
                                            </MenuItem>
                                        </Link>
                                    )}
                                </Route>
                            ))
                        }
                        <Divider />
                        <ListItem>
                            <div className={this.props.classes.expandFlex} />
                            <IconButton href={Links.facebook}><Facebook /></IconButton>
                            <div className={this.props.classes.expandFlex} />
                            <IconButton href={Links.github}><Github /></IconButton>
                            <div className={this.props.classes.expandFlex} />
                        </ListItem>
                    </MenuList>
                </Drawer>
            </React.Fragment>
        );
    }
}

MobileHeader.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.string).isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const styles = () => ({
    expandFlex: {
        flex: 1,
    },
    drawerPaper: {
        position: 'relative',
        width: '33%',
        minWidth: '240px',
    },
});

export default withStyles(styles)(MobileHeader);
