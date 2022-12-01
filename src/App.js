import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import './index.css';

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
    const {
      cardName,
      cardDescription,
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
      [target.id]: target.id !== 'cardTrunfo' ? value : target.checked,
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
      cards,
    } = this.state;
    return (
      <div className="column">
        <div className="principal mt-5">
          <div className="column centralize">
            <h1>Tryunfo</h1>
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
          </div>
          <div className="column centralize">
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              createDeleteButton={ false }
              onDelete={ () => {} }
            />
          </div>
        </div>
        <div className="secundaria">
          {
            cards.map((card) => {
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
                    createDeleteButton
                    onDelete={ this.onDelete }
                  />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
