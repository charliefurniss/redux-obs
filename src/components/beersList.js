import React from 'react';
import styled from 'styled-components';

export const BeersList = ({ beers }) => {
  return (
    <List>
      {beers.map((beer) => (
        <ListItem key={beer.id}>
          <Figure>
            <Image src={beer.image_url} alt={beer.name} />
          </Figure>
          <Content>
            <ListItemHeading>{beer.name}</ListItemHeading>
            <List>
              <DetailsListItem>
                <ListItemText>ABV: {beer.abv}</ListItemText>
              </DetailsListItem>
              <DetailsListItem>
                <ListItemText>
                  Volume: {beer.volume.unit} {beer.volume.unit}
                </ListItemText>
              </DetailsListItem>
            </List>
          </Content>
        </ListItem>
      ))}
    </List>
  );
};

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  text-align: left;
`;

const ListItem = styled.li`
  display: flex;
  list-style: none;
  align-items: flex-start;
  border: 1px solid #dcd7d2;
  box-shadow: 0 0 5px 0 rgba(45, 43, 36, 0.2);
  border-radius: 8px;
  margin: 16px 32px 16px;
  padding: 24px 0;
`;

const Figure = styled.div`
  display: flex;
  justify-content: center;
  width: 150px;
`;

const Image = styled.img`
  height: 120px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListItemHeading = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 12px;
`;

const DetailsListItem = styled.li`
  display: flex;
  list-style: none;
  align-items: flex-start;
`;

const ListItemText = styled.span`
  font-size: 14px;
  margin-bottom: 8px;
`;
