import React from 'react';
import PropTypes from 'prop-types';

const RightArrow = ({ width, height }) => (
  <div className="icons right-arrow">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" enableBackground="new 0 0 129 129" width={width} height={height}>
      <g>
        <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" fill="#d1d1d1" />
      </g>
    </svg>
  </div>
);

RightArrow.defaultProps = {
  width: '50',
  height: '50'
};

RightArrow.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
};

export default RightArrow;
