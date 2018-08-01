import React from 'react';
import {
	Home,
	Event as Events,
	Group as Committee,
	School as Homerton
} from '@material-ui/icons';

const Page = {
	home: 0,
	events: 1,
	committee: 2,
	studyHom: 3,
	privacy: 4
};

Page.getPageLabel = page => {
	switch(page) {
		case Page.home: return "Home";
		case Page.events: return "Events";
		case Page.committee: return "Committee";
		case Page.studyHom: return "Study at Homerton";
		case Page.privacy: return "Privacy Policy";
		default: return "";
	}
};

Page.getPageIcon = page => {
	switch(page) {
		case Page.home: return <Home/>
		case Page.events: return <Events/>;
		case Page.committee: return <Committee/>;
		case Page.studyHom: return <Homerton/>;
		default: return null;
	}
};

Object.freeze(Page);

export default Page;
