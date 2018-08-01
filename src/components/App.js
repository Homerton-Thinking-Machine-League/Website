import React from 'react';
import Page from '../util/pages';
import Header from './header/Header';
import { Home, Events, Committee, StudyHom, Privacy } from './pages';

export default class App extends React.Component {
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

		</React.Fragment>
	}
}
