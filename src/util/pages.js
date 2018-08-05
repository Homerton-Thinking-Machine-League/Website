import React from 'react';
import {
    Home,
    Event as Events,
    Group as Committee,
    School as Homerton,
} from '@material-ui/icons';

const Page = {
    home: 0,
    events: 1,
    committee: 2,
    studyHom: 3,
    privacy: 4,
};

Page.routes = {
    [Page.home]: '/',
    [Page.events]: '/events',
    [Page.committee]: '/committee',
    [Page.studyHom]: '/studyHom',
    [Page.privacy]: '/privacy',
};

Page.pageLabels = {
    [Page.home]: 'Home',
    [Page.events]: 'Events',
    [Page.committee]: 'Committee',
    [Page.studyHom]: 'Study at Homerton',
    [Page.privacy]: 'Privacy Policy',
};

Page.pageIcons = {
    [Page.home]: <Home />,
    [Page.events]: <Events />,
    [Page.committee]: <Committee />,
    [Page.studyHom]: <Homerton />,
};

Object.freeze(Page);

export default Page;
