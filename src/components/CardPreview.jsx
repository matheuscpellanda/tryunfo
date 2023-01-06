import React from 'react';
import PropTypes from 'prop-types';
import './css/CardPreview.css';
import logo from '../img/logo_tryunfo.png';
import logoReact from '../img/logo_tryunfo.jpg';

class CardPreview extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;
    return (
      <div className="card">
        <div className="card-preview">
          <h1 data-testid="name-card" className="card-title">{ cardName }</h1>
          {
            cardTrunfo ? (
              <span data-testid="trunfo-card" className="trunfo-card">
                <img
                  src={ logo }
                  alt="Trunfo"
                />
              </span>
            )
              : null
          }
          <img
            src={ cardImage }
            alt={ cardName }
            data-testid="image-card"
            className="image-card"
            onError={ ({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = logoReact;
            } }
          />
          <span className="span-description">
            <p
              data-testid="description-card"
              className="card-description"
            >
              { cardDescription }
            </p>
          </span>
          <div className="card-info">
            <p data-testid="rare-card" className="card-rare">{ cardRare }</p>
            <div className="row">
              <p>
                Attr01:
              </p>
              <p data-testid="attr1-card">{ cardAttr1 }</p>
            </div>
            <div className="row">
              <p>
                Attr02:
              </p>
              <p data-testid="attr2-card">{ cardAttr2 }</p>
            </div>
            <div className="row">
              <p>
                Attr03:
              </p>
              <p data-testid="attr3-card">{ cardAttr3 }</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CardPreview.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default CardPreview;
