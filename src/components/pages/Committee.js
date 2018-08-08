import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid, Avatar, Card, CardContent, CardActions, Typography, Button } from '@material-ui/core';
import { Email } from '@material-ui/icons';
import Loader from '../Loader';

class Committee extends React.Component {
    static propTypes = {
        classes: PropTypes.objectOf(PropTypes.string).isRequired,
    }

    constructor() {
        super();
        this.state = {
            loading: true,
            data: null,
            error: null,
        };
    }

    componentDidMount() {
        fetch('/api/committee')
            .then(response => response.json())
            .then(members =>
                Promise.all(members.map(member =>
                    fetch(`/api/committee?picture=${member.picture}`)
                        .then(async (response) => {
                            const blob = await response.blob();
                            return {
                                ...member,
                                picture: URL.createObjectURL(blob),
                            };
                        }))))
            .then(data => this.setState({ loading: false, data }))
            .catch(error => this.setState({ loading: false, error }));
    }

    render() {
        const { classes } = this.props;
        const { loading, data, error } = this.state;
        if (loading) {
            return <Loader />;
        }
        if (data) {
            return (
                <Grid container spacing={16}>
                    {data.map(member => (
                        <Grid item xs={6} md={3} key={member.picture}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Avatar
                                        src={member.picture}
                                        className={classes.avatar}
                                        alt={`${member.name} photo`}
                                    />
                                    <Typography variant="headline" component="h2">
                                        {member.name}
                                    </Typography>
                                    <Typography color="textSecondary" component="h3">
                                        {member.role}
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.cardActions}>
                                    <Button
                                        variant="fab"
                                        color="primary"
                                        href={`mailto:${member.email}`}
                                    >
                                        <Email />
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            );
        }
        return <div>Error: {error}</div>;
    }
}

const styles = theme => ({
    card: {
        maxWidth: '325px',
        height: '100%',
        margin: 'auto',
    },
    avatar: {
        width: '120px',
        height: '120px',
        margin: 'auto',
        marginBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
    },
    cardActions: {
        width: '100%',
        justifyContent: 'flex-end',
    },
});

export default withStyles(styles)(Committee);
