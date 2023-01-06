import React from 'react';
import PropTypes from 'prop-types';
import './css/Form.css';
import errorImg from '../img/error.png';
import checkImg from '../img/check.png';

class Form extends React.Component {
  calculatePoints = () => {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.props;
    const attr01 = cardAttr1 ? parseInt(cardAttr1, 10) : 0;
    const attr02 = cardAttr2 ? parseInt(cardAttr2, 10) : 0;
    const attr03 = cardAttr3 ? parseInt(cardAttr3, 10) : 0;
    const sum = attr01 + attr02 + attr03;
    return sum;
  };

  calculateRemainingPoints = () => {
    const MAX_POINTS = 210;
    return MAX_POINTS - this.calculatePoints();
  };

  validateName = () => {
    const { cardName } = this.props;
    if (!cardName || cardName.length <= 0) {
      return errorImg;
    }
    return checkImg;
  };

  validateDescription = () => {
    const { cardDescription } = this.props;
    if (!cardDescription || cardDescription.length <= 0) {
      return errorImg;
    }
    return checkImg;
  };

  validateImage = () => {
    const { cardImage } = this.props;
    if (!cardImage || cardImage.length <= 0) {
      return errorImg;
    }
    return checkImg;
  };

  validateAttr01 = () => {
    const { cardAttr1 } = this.props;
    const MAX_POINTS = 90;
    const points = this.calculateRemainingPoints();
    if (points < 0 || cardAttr1 > MAX_POINTS) {
      return errorImg;
    }
    return checkImg;
  };

  validateAttr02 = () => {
    const { cardAttr2 } = this.props;
    const MAX_POINTS = 90;
    const points = this.calculateRemainingPoints();
    if (points < 0 || cardAttr2 > MAX_POINTS) {
      return errorImg;
    }
    return checkImg;
  };

  validateAttr03 = () => {
    const { cardAttr3 } = this.props;
    const MAX_POINTS = 90;
    const points = this.calculateRemainingPoints();
    if (points < 0 || cardAttr3 > MAX_POINTS) {
      return errorImg;
    }
    return checkImg;
  };

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo, hasTrunfo, isSaveButtonDisabled, onInputChange,
      onSaveButtonClick } = this.props;
    return (
      <form action="" className="formulario">
        <h1>ADICIONE NOVA CARTA</h1>
        <label htmlFor="cardName" className="input-info">
          Nome
          <div className="row">
            <input
              type="text"
              name=""
              id="cardName"
              data-testid="name-input"
              value={ cardName }
              onChange={ onInputChange }
            />
            <img src={ this.validateName() } alt="" className="validate-image" />
          </div>
        </label>
        <label htmlFor="cardDescription" className="input-info">
          Descrição
          <div className="row">
            <textarea
              name=""
              id="cardDescription"
              cols="30"
              rows="10"
              data-testid="description-input"
              value={ cardDescription }
              onChange={ onInputChange }
            />
            <img src={ this.validateDescription() } alt="" className="validate-image" />
          </div>
        </label>
        <label htmlFor="cardAttr1" className="input-attr">
          Attr01
          <div className="row">
            <input
              type="number"
              name=""
              id="cardAttr1"
              data-testid="attr1-input"
              value={ cardAttr1 }
              onChange={ onInputChange }
            />
            <img src={ this.validateAttr01() } alt="" className="validate-image" />
          </div>
        </label>
        <label htmlFor="cardAttr2" className="input-attr">
          Attr02
          <div className="row">
            <input
              type="number"
              name=""
              id="cardAttr2"
              data-testid="attr2-input"
              value={ cardAttr2 }
              onChange={ onInputChange }
            />
            <img src={ this.validateAttr02() } alt="" className="validate-image" />
          </div>
        </label>
        <label htmlFor="cardAttr3" className="input-attr">
          Attr03
          <div className="row">
            <input
              type="number"
              name=""
              id="cardAttr3"
              data-testid="attr3-input"
              value={ cardAttr3 }
              onChange={ onInputChange }
            />
            <img src={ this.validateAttr03() } alt="" className="validate-image" />
          </div>
        </label>
        <span
          className="info-points"
        >
          { `Pontos restantes = ${this.calculateRemainingPoints()}` }
        </span>
        <label htmlFor="cardAttr1" className="input-attr">
          Imagem
          <div className="row">
            <input
              type="text"
              name=""
              id="cardImage"
              data-testid="image-input"
              value={ cardImage }
              onChange={ onInputChange }
            />
            <img src={ this.validateImage() } alt="" className="validate-image" />
          </div>
        </label>
        <label htmlFor="cardRare" className="input-info">
          Raridade
          <select
            name=""
            id="cardRare"
            data-testid="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito Raro</option>
          </select>
        </label>
        <h3>{`Total de Pontos = ${this.calculatePoints()}`}</h3>
        <div className="row divided g-10">
          {
            !hasTrunfo ? (
              <div className="super-trunfo">
                <input
                  type="checkbox"
                  name=""
                  id="cardTrunfo"
                  data-testid="trunfo-input"
                  checked={ cardTrunfo }
                  onChange={ onInputChange }
                />
                <p>Super Trybe Trunfo</p>
              </div>
            ) : (
              <p className="error-trunfo">
                Você já tem um Super Trybe Trunfo em seu baralho
              </p>
            )
          }
          <button
            type="submit"
            className="button-save"
            data-testid="save-button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
