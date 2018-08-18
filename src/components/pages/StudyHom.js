import React from 'react';
import { Typography } from '@material-ui/core';
import PaddedPaper from '../PaddedPaper';
import marked from '../../util/markdown';

const StudyHom = () => (
    <PaddedPaper>
        <Typography
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: marked(`
Watch this space, we're going to make some resources to show you why you should come to
Homerton to study Computer Science.
                `),
            }}
        />
    </PaddedPaper>
);

export default StudyHom;
