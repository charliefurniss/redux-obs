import React from 'react';
import { connect } from 'react-redux';

import { fetchData } from '../actions';
import { BeersList } from './beersList';

export function Beers({ beers, status, fetchData }) {
  console.log({ beers });
  return (
    <>
      <div className='App-inputs'>
        <button
          type='button'
          onClick={fetchData}
          disabled={status === 'pending'}
        >
          Fetch Beers!
        </button>
        {status === 'pending' && (
          <span className='App-spinner'>
            <img src={'./ajax-loader.gif'} alt='spinner' />
          </span>
        )}
      </div>
      {status === 'success' && <BeersList beers={beers} />}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    beers: state.beers.data,
    status: state.beers.status,
  };
};

export default connect(mapStateToProps, { fetchData })(Beers);
