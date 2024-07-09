import React from 'react';
import Main from './main';

import { BrowserRouter } from 'react-router-dom';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </>
  );
};

export default App;