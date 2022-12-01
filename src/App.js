import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import './index.css';

const INITIAL_STATE = {
  cardName: '',
  cardDescription: '',
  cardAttr1: 0,
  cardAttr2: 0,
  cardAttr3: 0,
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
  cards: [],
};
const maxPower = 90;
const maxPowerTotal = 210;

class App extends React.Component {
  state = {
    ...INITIAL_STATE,
  };

  onSaveButtonClick = (e) => {
    e.preventDefault();
    console.log(e);
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
    } = this.state;
    return (
      <div className="principal">
        <div className="column">
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
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
      </div>
    );
  }
}

export default App;
