import "./App.css";
import { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";

const Card = ({ id, title, message, tag, user, onDelete ,changeCartText }) => {
  const [inputValue, setInputValue] = useState(title);

  const setValue = (e) => {
    setInputValue(e.target.value);
    changeCartText(e.target.value ,id)
  };

  return (
    <div className="card">
      <textarea
        className="card__title"
        value={inputValue}
        onChange={setValue}
      />
      <div className="card__info">
        <div className="avatar">{user}</div>
        <div>{tag}</div>
        <button className="delete" onClick={() => onDelete(id)}>
          delete
        </button>
      </div>
    </div>
  );
};

class Wrapper extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    cardList: [],
  };
  componentDidMount() {
    const cards = JSON.parse(localStorage.getItem("to-do")) || [];    
    this.setState({
      cardList: cards,
    });
  }
  componentDidUpdate(){
    localStorage.setItem("to-do", JSON.stringify(this.state.cardList));
  }

  createHandler = () => {
    const newCard = {
      id: Math.ceil(Math.random()*100),
      title: "...",
      message: "",
      tag: "go",
      user: "A",
    };
    this.setState({
      cardList: [...this.state.cardList, newCard],
    });
  };

  onDeleteCard = (id) => {
    const newCardList = this.state.cardList.filter( item => item.id != id );

    console.log(id)
    this.setState({
      cardList: newCardList,
    });
  };
  changeCartText =(text, id)=>{


    const newCardList= this.state.cardList.map(item=>{
      if(item.id === id){
        return {
          id: item.id,
          title: text,
          message: item.message,
          tag: item.tag,
          user: item.user,
        }
      }
      return item
    })


    this.setState({
      cardList: newCardList,
    });
  }

  render() {
    const { cardList } = this.state;
    const { type, title } = this.props;
    const classNames = [type, "colum-wrapper"];
    return (
      <div className={classNames.join(" ")}>
        <h2 className="colum-wrapper__title">{title}</h2>
        {cardList.map((card, index) => (
          <Card
            title={card.title}
            message={card.message}
            tag={card.tag}
            user={card.user}
            key={card.id}
            onDelete={this.onDeleteCard}
            changeCartText={this.changeCartText}
            id={card.id}
          />
        ))}
        <button className="create-card" onClick={this.createHandler}>
          Create +
        </button>
      </div>
    );
  }
}

PropTypes.shape({
  title: PropTypes.string,
  message: PropTypes.string,
  tag: PropTypes.string,
  user: PropTypes.string,
});

Wrapper.propTypes = {
  type: PropTypes.oneOf(["to-do", "in-progress", "reviev", "done"]).isRequired,
};

function App() {
  
  return (
    <div className="app">
      <h1 className="title">Trello</h1>
      <div className="desck">
        <Wrapper title={"To-do"} type="to-do" />
      </div>
    </div>
  );
}

export default App;
