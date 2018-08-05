import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, AppBar, Drawer, MenuList, MenuItem, ListItem, ListItemIcon, ListItemText, Divider, IconButton, Typography, Toolbar } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import Page from '../../util/pages';
import Links from '../../util/links';
import { Facebook, Github } from '../Svg';

class MobileHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            drawerOpen: false,
        };
    }

    handleDrawerToggle(callback) {
        this.setState(prevState => ({ drawerOpen: !prevState.drawerOpen }), callback);
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
                    onClose={() => this.handleDrawerToggle(undefined)}
                    classes={{
                        paper: this.props.classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <MenuList>
                        {['home', 'events', 'committee', 'studyHom'].map(pageName => Page[pageName])
                            .map(page => (
                                <MenuItem
                                    key={page}
                                    selected={this.props.page === page}
                                    onClick={() =>
                                        this.handleDrawerToggle(() =>
                                            this.props.handlePageChange(page))
                                    }
                                >
                                    <ListItemIcon>{Page.getPageIcon(page)}</ListItemIcon>
                                    <ListItemText>{Page.getPageLabel(page)}</ListItemText>
                                </MenuItem>
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
    page: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
    handlePageChange: PropTypes.func.isRequired,
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
