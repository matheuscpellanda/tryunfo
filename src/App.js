import React from 'react';
import Card from './components/Card';
import CardPreview from './components/CardPreview';
import Form from './components/Form';
import './index.css';
import logo from './img/logo_tryunfo.png';

const INITIAL_STATE = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
  filter: '',
  filterRare: 'todas',
  filterTrunfo: false,
};
const maxPower = 90;
const maxPowerTotal = 210;

class App extends React.Component {
  state = {
    ...INITIAL_STATE,
    cards: [],
  };

  onSaveButtonClick = (e) => {
    e.preventDefault();
    const { cardName, cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;
    const newCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    this.setState((prevState) => ({
      cards: [...prevState.cards, newCard],
    }), () => {
      const { cards } = this.state;
      const hasTrunfo = cards.some((card) => card.cardTrunfo);
      if (hasTrunfo) {
        this.setState({
          hasTrunfo,
        });
      }
    });
    this.setState({ ...INITIAL_STATE });
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      [target.id]: (target.id
      !== 'cardTrunfo' && target.id !== 'filterTrunfo') ? value
        : target.checked,
    }, () => {
      this.setState((prevState) => {
        const { cardAttr1, cardAttr2, cardAttr3 } = prevState;
        return {
          isSaveButtonDisabled: !(
            prevState.cardName.length > 0
          && prevState.cardDescription.length > 0
          && prevState.cardImage.length > 0
          && cardAttr1.length > 0
          && cardAttr2.length > 0
          && cardAttr3.length > 0
          && cardAttr1 >= 0 && cardAttr1 <= maxPower
          && cardAttr2 >= 0 && cardAttr2 <= maxPower
          && cardAttr3 >= 0 && cardAttr3 <= maxPower
          && ((parseInt(cardAttr1, 10)
            + parseInt(cardAttr2, 10)
            + parseInt(cardAttr3, 10)) <= maxPowerTotal)
          ),
        };
      });
    });
  };

  onDelete = ({ target }) => {
    this.setState((prevState) => {
      const { cards } = prevState;
      const newCards = cards.filter((card) => card.cardName !== target.id);
      return {
        cards: newCards,
      };
    }, () => {
      const { cards } = this.state;
      const hasTrunfo = cards.some((card) => card.cardTrunfo);
      this.setState({
        hasTrunfo,
      });
    });
  };

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      cards,
      filter,
      filterRare,
      filterTrunfo,
    } = this.state;
    return (
      <div className="column">
        <img className="logo-tryunfo" src={ logo } alt="Tryunfo" />
        <div className="principal">
          <Form
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            hasTrunfo={ hasTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onInputChange={ this.handleChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
          <div className="preview">
            <h1 className="preview-h1">PRÉ-VISUALIZAÇÃO</h1>
            <CardPreview
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              onDelete={ () => {} }
            />
          </div>
        </div>
        <h1 className="search-title">TODAS AS CARTAS</h1>
        <div className="column">
          <div className="search-filters">
            <p>Filtros de Busca</p>
            <input
              type="text"
              name=""
              id="filter"
              data-testid="name-filter"
              value={ filter }
              onChange={ this.handleChange }
              disabled={ filterTrunfo }
              placeholder="Nome da Carta"
            />
            <select
              name=""
              id="filterRare"
              data-testid="rare-filter"
              value={ filterRare }
              onChange={ this.handleChange }
              disabled={ filterTrunfo }
            >
              <option value="todas">Todas</option>
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito Raro</option>
            </select>
            <label htmlFor="filterTrunfo">
              <input
                type="checkbox"
                name=""
                id="filterTrunfo"
                data-testid="trunfo-filter"
                checked={ filterTrunfo }
                onChange={ this.handleChange }
              />
              Super Trybe Trunfo
            </label>
          </div>
          <div className="secundaria">
            {
              cards.filter((card) => {
                const {
                  cardName: name,
                  cardRare: rare,
                  cardTrunfo: trunfo,
                } = card;
                return name.toLowerCase().includes(filter.toLowerCase())
                  && (filterRare === 'todas' ? true : (rare === filterRare))
                  && (filterTrunfo === true ? (trunfo === true) : true);
              })
                .map((card) => {
                  const {
                    cardName: name,
                    cardDescription: description,
                    cardAttr1: attr1,
                    cardAttr2: attr2,
                    cardAttr3: attr3,
                    cardImage: image,
                    cardRare: rare,
                    cardTrunfo: trunfo,
                  } = card;
                  console.log('trunfo?', trunfo);
                  return (
                    <div className="column centralize" key={ name }>
                      <Card
                        key={ name }
                        cardName={ name }
                        cardDescription={ description }
                        cardAttr1={ attr1 }
                        cardAttr2={ attr2 }
                        cardAttr3={ attr3 }
                        cardImage={ image }
                        cardRare={ rare }
                        cardTrunfo={ trunfo }
                        onDelete={ this.onDelete }
                      />
                    </div>
                  );
                })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
