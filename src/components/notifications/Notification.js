import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, SnackbarContent, IconButton, withStyles } from '@material-ui/core';
import { green, amber } from '@material-ui/core/colors';
import { Close as CloseIcon } from '@material-ui/icons';
import Notifications from '../../util/notifications';

const Notification = (props) => {
    const Icon = Notifications[props.variant].icon;
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={props.open}
        >
            <SnackbarContent
                className={`${props.classes[props.variant]}`}
                message={
                    <span className={props.classes.message}>
                        <Icon className={`${props.classes.iconVariant} ${props.classes.icon}`} />
                        {props.message}
                    </span>
                }
                action={
                    <IconButton
                        color="inherit"
                        className={props.classes.close}
                        onClick={props.onClose}
                    >
                        <CloseIcon className={props.classes.icon} />
                    </IconButton>
                }
            />
        </Snackbar>
    );
};

Notification.propTypes = {
    open: PropTypes.bool.isRequired,
    variant: PropTypes.oneOf(Object.keys(Notifications)).isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const styles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

export default withStyles(styles)(Notification);
