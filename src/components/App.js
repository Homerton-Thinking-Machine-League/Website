import React from 'react';
import Page from '../util/pages';
import Header from './header/Header';
import { Home, Events, Committee, StudyHom, Privacy } from './pages';
import { withStyles, Hidden, Typography } from '@material-ui/core';
import background from '../res/Homerton.jpg';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			currentPage: Page.home
		}
	}

	handlePageChange(newPage) {
		this.setState({ currentPage: newPage })
	}

	render() {
		return <React.Fragment>
			<div className={this.props.classes.background}/>
			<Header
				page={this.state.currentPage}
				handlePageChange={this.handlePageChange.bind(this)}
			/>
			<div className={this.props.classes.content}>
				<Hidden mdUp>
					<Typography variant="title" color="inherit" className={this.props.classes.mobilePageHeader}>
						{Page.getPageLabel(this.state.currentPage)}
					</Typography>
				</Hidden>
				{(() => {
					switch(this.state.currentPage) {
						case Page.home: return <Home/>;
						case Page.events: return <Events/>;
						case Page.committee: return <Committee/>;
						case Page.studyHom: return <StudyHom/>;
						case Page.privacy: return <Privacy/>;
						default: return null;
					}
				})()}
			</div>
		</React.Fragment>
	}
};

const styles = theme => ({
	background: {
		zIndex: -1,
		display: "block",
		position: "fixed",
		height: "100%",
		width: "100%",
		"background-image": `url(${background})`,
		"background-position": "center",
		"background-repeat": "no-repeat",
		"background-size": "cover",
	},
	content: {
		"max-width": 800,
		margin: "auto",
		padding: 3 * theme.spacing.unit,
		[theme.breakpoints.up('md')]: {
			"padding-top": 75 + 3 * theme.spacing.unit
		},
		[theme.breakpoints.down('sm')]: {
			"padding-top": 50 + 3 * theme.spacing.unit
		}
	},
	mobilePageHeader: {
		"padding-bottom": 3 * theme.spacing.unit
	}
});

export default withStyles(styles)(App)
