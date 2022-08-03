import React from 'react';
import MemberComponent from './MemberComponent';

const MainComponent = ({modalOpen}) => {
  return (
    <main id="main">
      <MemberComponent modalOpen={modalOpen} />
    </main>
  );
};

export default MainComponent;