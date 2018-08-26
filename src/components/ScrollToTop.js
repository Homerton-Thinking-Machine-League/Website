import React from 'react';
import PropTypes from 'prop-types';

class ScrollToTop extends React.Component {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        location: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired,
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

export default ScrollToTop;
