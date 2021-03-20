import { connect } from 'react-redux';

import './App.css';

import Beers from './components/beers'; // use the ReduxConnected version of the component which is exported as default

function App() {
  return (
    <div className='App'>
      <Beers />
    </div>
  );
}

export default connect((state) => state.app)(App);
