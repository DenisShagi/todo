import React, {useState} from 'react';
import "./App.css";

const App = () => {
  const [boards, setBoards] = useState([
    {id: 1, title: 'To Do', items: [{id: 1, title: "Пойти в магазин"}, {id: 2, title: "Выкинуть мусор"},  {id: 3, title: "Покушать"}]},
    {id: 2, title: "In progress",  items: [{id: 4, title: 'Код ревью'}, {id: 5, title: "Задача на факториал"},  {id: 6, title: "Задача на фибоначчи"}]},
    {id: 3, title: "Review", items: [{id: 7, title: "Снять видно"}, {id: 8, title: "Смонтировать"}, {id: 9, title: "Отрендерить"}]},
    {id: 4, title: "Done", items: [{id: 7, title: "Снять видно"}, {id: 8, title: "Смонтировать"}, {id: 9, title: "Отрендерить"}]},
  ])

  const [newTaskTitle, setNewTaskTitle] = useState("");

  function addCardToFirstColumn() {
    if (newTaskTitle.trim() !== "") {
      const newCard = { id: Date.now(), title: newTaskTitle };
      const updatedBoards = boards.map(board => {
        if (board.id === 1) {
          return { ...board, items: [...board.items, newCard] };
        }
        return board;
      });
      setBoards(updatedBoards);
      setNewTaskTitle(""); // Очищаем поле ввода после добавления задачи
    }
  }

  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)


  function dragOverHandler(e) {
    e.preventDefault()
    if(e.target.className == 'item'){
      e.target.style.boxShadow = '0 2px 3px gray'
    }
  }

  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none'
  }

  function dragStartHandler(e, board, item) {
  setCurrentBoard(board)
    setCurrentItem(item)
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none'
  }

  function dropHandler(e, board, item) {
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem )
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
    e.target.style.boxShadow = 'none'
  }

  function dropCardHandler(e, board) {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
    e.target.style.boxShadow = 'none'
  }

  return (
      <div className="app">

        <div className="add-task">
          <input
              className="input-value"
              type="text"
              placeholder="Введите название задачи"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button className='btn' onClick={addCardToFirstColumn}>Add</button>
        </div>

        {boards.map(board =>
            <div
                className={`board board-${board.id}`}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropCardHandler(e, board)}
            >
              <div className="board__title">{board.title}</div>
              {board.items.map(item =>
                  <div
                      onDragOver={(e) => dragOverHandler(e)}
                      onDragLeave={e => dragLeaveHandler(e)}
                      onDragStart={(e) => dragStartHandler(e, board, item)}
                      onDragEnd={(e) => dragEndHandler(e)}
                      onDrop={(e) => dropHandler(e, board, item)}
                      className="todo"
                      draggable={true}
                      className="item"
                  >
                    {item.title}</div>
              )}
            </div>
        )}
      </div>
  );
};

export default App;