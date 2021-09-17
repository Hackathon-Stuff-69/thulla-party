import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav className='flex items-center justify-between flex-wrap bg-green-500 p-6'>
          <div className='flex items-center flex-shrink-0 text-white mr-6'>
            <span className='font-semibold text-xl tracking-tight'>Thulla Party</span>
          </div>
        </nav>

        <Switch>
          {/* <Route exact path='/todos'>
            <Todos />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
