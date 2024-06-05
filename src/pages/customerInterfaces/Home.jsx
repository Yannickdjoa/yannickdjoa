import React from 'react';
import MainView from '../../sections/MainView';
import Offers from '../../sections/Offers';

function Home() {
  return (
    <div className="flex flex-col gap-2">
      <MainView />
      <Offers />
    </div>
  );
}

export default Home;
