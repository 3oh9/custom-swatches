import React, { Component } from 'react';
import { string } from 'prop-types';

import './style.scss';

class Loader extends Component {
  static propTypes = {
    themeColor: string,
    className: string,
  }

  static defaultProps = {
    className: '',
    themeColor: '#aca8b1',
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { themeColor, className } = this.props;
    return (
      <div className={`loader-wrapper ${className}`}>
        <div className="lds-ellipsis">
          {
            Array.from(
              { length: 4 },
              (e, i) => <div style={{ backgroundColor: themeColor }} key={i} />,
            )
          }
        </div>
      </div>
    );
  }
}

export default Loader;
