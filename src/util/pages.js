import React from 'react';
import {
    Home,
    Event as Events,
    Group as Committee,
    School as Homerton,
} from '@material-ui/icons';
import { News } from '../components/Svg';

const Page = {
    home: 0,
    news: 1,
    events: 2,
    committee: 3,
    studyHom: 4,
    privacy: 5,
};

Page.routes = {
    [Page.home]: '/',
    [Page.news]: '/news',
    [Page.events]: '/events',
    [Page.committee]: '/committee',
    [Page.studyHom]: '/studyHom',
    [Page.privacy]: '/privacy',
};

Page.pageLabels = {
    [Page.home]: 'Home',
    [Page.news]: 'News',
    [Page.events]: 'Events',
    [Page.committee]: 'Committee',
    [Page.studyHom]: 'Study at Homerton',
    [Page.privacy]: 'Privacy Policy',
};

Page.pageIcons = {
    [Page.home]: <Home />,
    [Page.news]: <News />,
    [Page.events]: <Events />,
    [Page.committee]: <Committee />,
    [Page.studyHom]: <Homerton />,
};

Object.freeze(Page);

export default Page;
