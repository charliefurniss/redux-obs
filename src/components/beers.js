import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { search, cancel, setConfig } from '../actions';
import { BeersList } from './beersList';

export function Beers({
  beers,
  messages,
  status,
  search,
  cancel,
  config,
  setConfig,
}) {
  return (
    <>
      <InputContainer>
        <select
          name='per-page'
          defaultValue={config.perPage}
          onChange={(e) => setConfig({ perPage: Number(e.target.value) })}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <option key={value} value={value}>
              {value} results
            </option>
          ))}
        </select>
        <Input
          type='text'
          placeholder='Search beers'
          onChange={(e) => search(e.target.value)}
        />
        {status === 'pending' && (
          <>
            <button type='button' onClick={cancel}>
              Cancel
            </button>
            <Spinner
              src={'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'}
              alt='spinner'
            />
          </>
        )}
      </InputContainer>
      {status === 'success' && <BeersList beers={beers} />}
      {status === 'failure' && <p>Oops! {messages[0].text}</p>}
    </>
  );
}

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 96px;
`;

const Input = styled.input``;

const Spinner = styled.img`
  height: 96px;
`;

const mapStateToProps = (state) => {
  return {
    beers: state.beers.data,
    status: state.beers.status,
    messages: state.beers.messages,
    config: state.config,
  };
};

export default connect(mapStateToProps, { search, cancel, setConfig })(Beers);
