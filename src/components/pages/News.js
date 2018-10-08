import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import marked from '../../util/markdown';
import Loader from '../Loader';
import PaddedPaper from '../PaddedPaper';
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
            hasMore: true,
        };
        this.postsPerPage = 5;
        this.handleScrollListener = () => this.handleScroll();
    }

    static getTimeString(time) {
        const momentTime = moment(time);
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

    loadMore(page) {
        const limit = this.postsPerPage;
        const offset = page * this.postsPerPage;
        fetch(`/api/news?offset=${offset}&limit=${limit}`)
            .then(async (response) => {
                const json = await response.json();
                if (!response.ok) {
                    throw new Error(json.message || response.statusText);
                }
                return json;
            })
            .then((posts) => {
                this.setState(prevState => ({
                    posts: prevState.posts.concat(posts),
                    hasMore: posts.length !== 0,
                }));
            })
            .catch((err) => {
                this.props.addNotification('error', err.message);
                this.setState({
                    hasMore: false,
                });
            });
    }

    render() {
        const { posts, hasMore } = this.state;
        const { classes } = this.props;
        return (
            <React.Fragment>
                <InfiniteScroll
                    hasMore={this.state.hasMore}
                    loadMore={page => this.loadMore(page)}
                    loader={<Loader key="loader_component" />}
                    threshold={100}
                    pageStart={-1}
                >
                    {posts.map(post => (
                        <PaddedPaper key={post.id} className={classes.post}>
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
                        </PaddedPaper>
                    ))}
                </InfiniteScroll>
                {hasMore ? null : (
                    <Typography
                        align="center"
                        color="primary"
                        variant="title"
                    >
                        {posts.length === 0 ? 'No news to show' : 'No older news'}
                    </Typography>
                )}
            </React.Fragment>
        );
    }
}

const styles = theme => ({
    post: {
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
