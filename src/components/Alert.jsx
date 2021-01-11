import React from 'react';

export const Alert = props => {
  const {message} = props;

  return (
    <div className="Alert">
      <p className="Alert-message">{message}</p>
    </div>
  );
}