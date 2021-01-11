import React from 'react';

export const Loader = ({message}) => {
  return (
    <div className="Loader">
      <i className="fa fa-spinner fa-spin" aria-hidden="true" />
      {message && <p className="Loader-message">{message}</p>}
    </div>
  );
}