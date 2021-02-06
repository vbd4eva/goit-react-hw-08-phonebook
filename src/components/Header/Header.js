import React from 'react'
import PropTypes from 'prop-types'

function Header({title, rank, className})
{  
    const propClass = (className) ? className : `h${rank}`;

    const titleEl = React.createElement('h' + rank, { className: propClass}, title);
  
    return (
        <>
            {titleEl}
        </>
    )
}
Header.defaultProps = {
    rank: "2",
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default Header

