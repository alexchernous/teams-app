/* eslint-disable no-unused-vars */
import React from 'react';

const User = (props) => {
  const { user, isTeamLead } = props;

  return (
    user && <tr key={user.id} style={{ border: '5px solid red', textAlign: 'center' }}>
      <td style={{ display: 'flex', alignItems: 'center' }}>
        <img src={user.avatarUrl} alt="avatar" width="50" height="50" />
        {isTeamLead && (
          <p style={{ fontWeight: '700', color: 'red', margin: '5px' }}>LEAD</p>
        )}
      </td>
      <td>{user.displayName}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.location}</td>
    </tr>
  );
};

export default User;
