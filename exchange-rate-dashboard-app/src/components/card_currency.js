import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';

import './card_currency.css';

const CardCurrency = (props) => {
  const {
    currencyName,
    value,
    baseCurrency,
    currencyImgSrc
  } = props


  return (
    <div>
      <Card>
        <CardImg top src={currencyImgSrc} width="100%" alt="No Image" />
        <CardBody>
          <CardTitle>{currencyName}</CardTitle>
          <CardSubtitle>{baseCurrency}</CardSubtitle>
          <CardText>{value}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardCurrency;
