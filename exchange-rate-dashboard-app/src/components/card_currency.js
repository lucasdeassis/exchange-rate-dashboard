import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';

const CardCurrency = (props) => {
  const {
    currencyName,
    value,
    baseCurrency
  } = props


  return (
    <div>
      <Card>
        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        <CardBody>
          <CardTitle>{currencyName}</CardTitle>
          <CardSubtitle>{value}</CardSubtitle>
          <CardText>{baseCurrency}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardCurrency;
