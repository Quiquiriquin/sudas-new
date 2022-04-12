import React from 'react';
import './ProfilePic.scss';
import Avatar from 'boring-avatars';
import { nanoid } from 'nanoid';
import { Tooltip } from 'antd';

const ProfilePic = ({ size, id, name }) => {
  return (
    <Tooltip title={name}>
      <div>
        <Avatar
          size={size || 40}
          name={`${name} ${id}` || nanoid(6)}
          variant="beam"
          colors={[
            '#92A1C6',
            '#146A7C',
            '#F0AB3D',
            '#C271B4',
            '#C20D90',
          ]}
        />
      </div>
    </Tooltip>
  );
};

export default ProfilePic;
