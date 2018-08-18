import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardContent, Typography } from '@material-ui/core';
import moment from 'moment';
import marked from 'marked';
import Loader from '../Loader';
import { NotificationContext } from '../../util/notifications';

class News extends React.Component {
    static propTypes = {
        classes: PropTypes.objectOf(PropTypes.string).isRequired,
        addNotification: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            posts: [],
            loading: true,
        };
    }

    componentDidMount() {
        this.loadPosts();
    }

    static getTimeString(time) {
        const momentTime = moment.utc(time, 'YYYY-MM-DD HH:mm:ss');
        momentTime.local();
        if (momentTime > moment().subtract(1, 'days')) {
            return momentTime.fromNow();
        }
        if (momentTime > moment().subtract(1, 'weeks')) {
            return momentTime.format('ddd HH:mm');
        }
        if (momentTime > moment().subtract(1, 'years')) {
            return momentTime.format('D MMM');
        }
        return momentTime.format('D MMM Y');
    }

    loadPosts() {
        const offset = this.state.posts.length;
        fetch(`/api/news?offset=${offset}`)
            .then(response => response.json())
            .then(posts => this.setState(prevState => ({
                posts: prevState.posts.concat(posts),
                loading: false,
            })))
            .catch((error) => {
                this.setState({ loading: false });
                this.props.addNotification('error', error.message);
            });
    }

    render() {
        const { posts, loading } = this.state;
        const { classes } = this.props;
        return (
            <React.Fragment>
                {posts.map(post => (
                    <Card key={post.id} className={classes.card}>
                        <CardContent>
                            <div className={classes.meta}>
                                <Typography color="textSecondary">
                                    {post.author}
                                </Typography>
                                <Typography color="textSecondary">
                                    {News.getTimeString(post.time)}
                                </Typography>
                            </div>
                            <Typography
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{ __html: marked(post.text) }}
                            />
                        </CardContent>
                    </Card>
                ))}
                {loading ? <Loader /> : null}
            </React.Fragment>
        );
    }
}

const styles = theme => ({
    card: {
        padding: 2 * theme.spacing.unit,
        marginBottom: 2 * theme.spacing.unit,
    },
    meta: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const NotificationContextWrapper = props => (
    <NotificationContext.Consumer>
        {({ addNotification }) => (
            <News {...props} addNotification={addNotification} />
        )}
    </NotificationContext.Consumer>
);

export default withStyles(styles)(NotificationContextWrapper);
