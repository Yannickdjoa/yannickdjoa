import React, { useEffect } from 'react';
import MainView from '../../sections/MainView';
// import Offers from '../sections/Offers';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
  
  return (
    <div className="h-screen ">
      <MainView />
      {/* <Offers /> */}
    </div>
  );
}

export default Home;
