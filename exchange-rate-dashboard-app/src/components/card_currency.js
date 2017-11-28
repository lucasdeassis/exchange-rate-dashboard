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
        <CardImg className="card-img" top src={currencyImgSrc} alt="currency" />
        <CardBody>
          <CardTitle className="card-title">{currencyName}</CardTitle>
          <CardSubtitle className="card-subtitle">{baseCurrency}</CardSubtitle>
          <CardText className="card-text">{value}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardCurrency;
