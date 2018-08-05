import React from 'react';
import {
    Error as ErrorIcon,
    Warning as WarningIcon,
    Info as InfoIcon,
    CheckCircle as SuccessIcon,
} from '@material-ui/icons';

export const NotificationContext = React.createContext({
    addNotification: () => console.warn('Notification consumer used ouside of a provider'), // eslint-disable-line no-console
});

const Notifications = {
    error: {
        icon: ErrorIcon,
        delay: 10000,
    },
    warning: {
        icon: WarningIcon,
        delay: 10000,
    },
    info: {
        icon: InfoIcon,
        delay: 5000,
    },
    success: {
        icon: SuccessIcon,
        delay: 5000,
    },
};

export default Notifications;
