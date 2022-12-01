import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  deleteButton = (cardName, createDeleteButton, onDelete) => {
    if (createDeleteButton) {
      return (
        <button
          id={ cardName }
          type="button"
          onClick={ onDelete }
          data-testid="delete-button"
        >
          Excluir
        </button>);
    }
    return null;
  };

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
      createDeleteButton,
      onDelete,
    } = this.props;
    return (
      <>
        <h1>Carta</h1>
        <div className="card">
          {
            cardTrunfo ? <p data-testid="trunfo-card">Super Trunfo</p> : null
          }
          {
            this.deleteButton(cardName, createDeleteButton, onDelete)
          }
          <p data-testid="name-card">{ cardName }</p>
          <img src={ cardImage } alt={ cardName } data-testid="image-card" />
          <p data-testid="description-card">{ cardDescription }</p>

          <p data-testid="attr1-card">
            HardSkill:
            { cardAttr1 }
          </p>
          <p data-testid="attr2-card">
            SoftSkill:
            { cardAttr2 }
          </p>
          <p data-testid="attr3-card">
            Mercado de Trabalho:
            { cardAttr3 }
          </p>
          <p data-testid="rare-card">{ cardRare }</p>
        </div>
      </>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  createDeleteButton: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Card;
