import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { search, cancel } from '../actions';
import { BeersList } from './beersList';

export function Beers({ beers, messages, status, search, cancel }) {
  console.log({ messages });
  return (
    <>
      <InputContainer>
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
  };
};

export default connect(mapStateToProps, { search, cancel })(Beers);
