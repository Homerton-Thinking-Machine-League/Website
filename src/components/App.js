import React from 'react';
import Page from '../util/pages';
import Header from './header/Header';
import { Home, Events, Committee, StudyHom, Privacy } from './pages';
import { withStyles } from '@material-ui/core';

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
			<Header
				page={this.state.currentPage}
				handlePageChange={this.handlePageChange.bind(this)}
			/>
			<div className={this.props.classes.content}>
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
	content: {
		padding: 3 * theme.spacing.unit,
		[theme.breakpoints.up('md')]: {
			"padding-top": 75 + 3 * theme.spacing.unit
		},
		[theme.breakpoints.down('sm')]: {
			"padding-top": 50 + 3 * theme.spacing.unit
		}
	}
});

export default withStyles(styles)(App)
