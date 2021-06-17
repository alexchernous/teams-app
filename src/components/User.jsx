/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import constants from '../constants';

const User = (props) => {
  const { userId, isTeamLead } = props;
  const [firstFetch, setFirstFetch] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (userId && firstFetch) {
      // fetch user details for particular userId
      axios.get(constants.endpoints.user(userId))
        .then((res) => {
          setUserDetails(res.data);
          setFirstFetch(false);
        })
        .catch((error) => { throw new Error(error); });
    }
  }, [userId]);

  return (
    <tr key={userId} style={{ border: '5px solid red' }}>
      {userDetails && (
        <React.Fragment>
          <td style={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}>
            <img src={userDetails.avatarUrl} alt="avatar" width="50" height="50" />
            {isTeamLead && (
              <p style={{ fontWeight: '700', color: 'red', margin: '5px' }}>LEAD</p>
            )}
          </td>
          <td>{userDetails.displayName}</td>
          <td>{userDetails.firstName}</td>
          <td>{userDetails.lastName}</td>
          <td>{userDetails.location}</td>
        </React.Fragment>
      )}
    </tr>
  );
};

export default User;
