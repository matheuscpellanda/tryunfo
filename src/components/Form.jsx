import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
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
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <form action="" className="formulario">
        <input
          type="text"
          name=""
          id="cardName"
          data-testid="name-input"
          value={ cardName }
          onChange={ onInputChange }
        />
        <textarea
          name=""
          id="cardDescription"
          cols="30"
          rows="10"
          data-testid="description-input"
          value={ cardDescription }
          onChange={ onInputChange }
          placeholder="Digite uma descrição"
        />
        <input
          type="number"
          name=""
          id="cardAttr1"
          data-testid="attr1-input"
          value={ cardAttr1 }
          onChange={ onInputChange }
          placeholder="Digite o valor do atributo 1"
        />
        <input
          type="number"
          name=""
          id="cardAttr2"
          data-testid="attr2-input"
          value={ cardAttr2 }
          onChange={ onInputChange }
          placeholder="Digite o valor do atributo 2"
        />
        <input
          type="number"
          name=""
          id="cardAttr3"
          data-testid="attr3-input"
          value={ cardAttr3 }
          onChange={ onInputChange }
          placeholder="Digite o valor do atributo 3"
        />
        <input
          type="text"
          name=""
          id="cardImage"
          data-testid="image-input"
          value={ cardImage }
          onChange={ onInputChange }
          placeholder="Digite o link da imagem"
        />
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
        <input
          type="checkbox"
          name=""
          id="cardTrunfo"
          data-testid="trunfo-input"
          checked={ cardTrunfo }
          onChange={ onInputChange }
        />
        <button
          type="submit"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
          {' '}
          { hasTrunfo }

        </button>
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
