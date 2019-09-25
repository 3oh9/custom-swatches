import React from 'react';
import { arrayOf, object } from 'prop-types';
import '../../assets/inputErrors.scss';

const InputErrors = props => (
  <div className="input-errors">
    {props.errors && props.errors.length > 0 && props.errors.map(error => (
      <p key={error.type}>{error.message}</p>
    ))}
  </div>
);

InputErrors.defaultProps = {
  errors: [],
};

InputErrors.propTypes = {
  errors: arrayOf(object),
};
export default InputErrors;
