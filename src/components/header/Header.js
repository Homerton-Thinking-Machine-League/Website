import React from 'react';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import { Hidden } from '@material-ui/core';

const Header = (props) => <React.Fragment>
	<Hidden smDown>
		<DesktopHeader {...props}/>
	</Hidden>
	<Hidden mdUp>
		<MobileHeader {...props}/>
	</Hidden>
</React.Fragment>;

export default Header;