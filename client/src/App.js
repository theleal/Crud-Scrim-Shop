import React, { useState, useEffect } from "react"
import './App.css';
import Axios from "axios"
import Card from "./components/cards/Card";

function App() {
  const [values, SetValues] = useState();
  const [listGames, setListGames] = useState();
  console.log(listGames)

  const handleChangeValues = (value) => {
    SetValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then(() => {
      setListGames([
        ...listGames,
        {
          name: values.name,
          cost: values.cost,
          category: values.category
        },
      ]);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListGames(response.data);
    });
  }, []);

  return (

    <div className="background">
      <div className="app--container">
        <div className="register--container">
          <h1 id="titulo">Scrim Shop</h1>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            className="register--input"
            onChange={handleChangeValues}
          />
          <input
            type="text"
            name="cost"
            placeholder="Preço"
            className="register--input"
            onChange={handleChangeValues}

          />
          <input
            type="text"
            name="category"
            placeholder="Categoria"
            className="register--input"
            onChange={handleChangeValues}

          />
          <button className="register--button"
            onClick={() => handleClickButton()} >CADASTRAR</button>
        </div>
        

      {!!listGames && listGames.map((value) => {
        return (
        <Card
          key={value.id}
          ListCard={listGames}
          setListCard={setListGames}
          id={value.idgames}
          name={value.name}
          cost={value.cost}
          category={value.category}
          ></Card> 
        );
      })}
      </div>
    </div>
  );
}

export default App;
