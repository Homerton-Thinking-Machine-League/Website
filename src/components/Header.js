import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, AppBar, Tabs, Tab, Toolbar } from '@material-ui/core';
import Page from '../util/pages';
import Links from '../util/links';
import { Facebook, Github } from './Svg';
import logo from '../res/logo.png';

const Header = (props) => <AppBar position="static">
	<Toolbar>
		<img src={logo} alt="logo" className={props.classes.logo}/>
		<Tabs
			value={props.page}
			onChange={(_, newPage) => props.handlePageChange(newPage)}
		>
			{["home", "events", "committee", "studyHom"].map(pageName => Page[pageName])
				.map(page => <Tab
					key={page}
					value={page}
					color="inherit"
					label={Page.getPageLabel(page)}
					icon={Page.getPageIcon(page)}
				/>)
			}
		</Tabs>

		<div className={props.classes.expandFlex}/>

		<Tab
			className={props.classes.socialMediaTab}
			href={Links.facebook}
			icon={<Facebook/>}
		/>
		<Tab
			className={props.classes.socialMediaTab}
			href={Links.github}
			icon={<Github/>}
		/>
	</Toolbar>
</AppBar>;

Header.propTypes = {
	page: PropTypes.any.isRequired,
	handlePageChange: PropTypes.func.isRequired,
	classes: PropTypes.shape({
		logo: PropTypes.string.isRequired,
		expandFlex: PropTypes.string.isRequired,
		socialMediaTab: PropTypes.string.isRequired
	}).isRequired
}

const styles = theme => ({
	logo: {
		padding: theme.spacing.unit,
		width: "120px"
	},
	expandFlex: {
		flex: 1
	},
	socialMediaTab: {
		'min-width': 0,
		padding: theme.spacing.unit
	}
})

export default withStyles(styles)(Header);