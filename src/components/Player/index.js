'use client';

import React from 'react';

const Player = ({player}) => {
  const nickname = player?.nickname;

  return (
    <div>
      {nickname}
    </div>
  );
};

export default Player;