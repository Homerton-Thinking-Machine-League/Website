import React from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';
import Notifications, { NotificationContext } from '../../util/notifications';

export default class NotificationLayer extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]),
    };

    static defaultProps = {
        children: [],
    }

    constructor() {
        super();
        this.state = {
            notification: null,
            timeout: null,
        };
    }

    addNotification(variant, message) {
        this.closeNotification(() => this.setState(() => {
            if (Notifications[variant] === undefined) {
                return {};
            }
            return {
                notification: { message, variant },
                timeout: setTimeout(() => this.closeNotification(), Notifications[variant].delay),
            };
        }));
    }

    closeNotification(callback) {
        this.setState((prevState) => {
            clearTimeout(prevState.timeout);
            return {
                notification: null,
                timeout: null,
            };
        }, callback);
    }

    render() {
        return (
            <React.Fragment>
                <NotificationContext.Provider
                    value={{
                        addNotification: (variant, message) =>
                            this.addNotification(variant, message),
                    }}
                >
                    {this.props.children}
                </NotificationContext.Provider>
                {
                    this.state.notification !== null
                        ? (
                            <Notification
                                {...this.state.notification}
                                open={this.state.notification !== null}
                                onClose={() => this.closeNotification()}
                            />
                        ) : null
                }
            </React.Fragment>
        );
    }
}
