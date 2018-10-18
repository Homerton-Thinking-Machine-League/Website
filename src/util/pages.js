import React from 'react';
import {
    Home,
    Event as Events,
    Group as Committee,
} from '@material-ui/icons';
import { News, Python } from '../components/Svg';

const Page = {
    home: 0,
    news: 1,
    events: 2,
    committee: 3,
    comeAndCode: 4,
    privacy: 5,
};

Page.routes = {
    [Page.home]: '/',
    [Page.news]: '/news',
    [Page.events]: '/events',
    [Page.committee]: '/committee',
    [Page.comeAndCode]: '/comeAndCode',
    [Page.privacy]: '/privacy',
};

Page.pageLabels = {
    [Page.home]: 'Home',
    [Page.news]: 'News',
    [Page.events]: 'Events',
    [Page.committee]: 'Committee',
    [Page.comeAndCode]: 'Come and Code',
    [Page.privacy]: 'Privacy Policy',
};

Page.pageIcons = {
    [Page.home]: <Home />,
    [Page.news]: <News />,
    [Page.events]: <Events />,
    [Page.committee]: <Committee />,
    [Page.comeAndCode]: <Python />,
};

Object.freeze(Page);

export default Page;
