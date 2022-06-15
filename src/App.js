import React, { useEffect, useState } from 'react';
import './App.css'
import SingleCard from './SingleCard';

const cardImages=[
  {"src":"/img/helmet-1.png",matched:false},
  {"src":"/img/potion-1.png",matched:false},
  {"src":"/img/ring-1.png",matched:false},
  {"src":"/img/scroll-1.png",matched:false},
  {"src":"/img/shield-1.png",matched:false},
  {"src":"/img/sword-1.png",matched:false}
]
export default function App() {

  const [cards,setCards]=useState([]);
  const [turns,setTurns]=useState(0);
  const [choiceOne,setChoiceOne]=useState(null);
  const [choiceTwo,setChoiceTwo]=useState(null);
  const [disabled,setDisabled]=useState(false)

  //handle choise
    const handleChoice=(card)=>{
      choiceOne ?setChoiceTwo(card):setChoiceOne(card)
    }

    const resetTurn=()=>{
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns((prevTurns)=>prevTurns+1);
      setDisabled(false)
    }

    useEffect(()=>{
      if(choiceOne && choiceTwo){
        setDisabled(true)
        if(choiceOne.src===choiceTwo.src){
          setCards(prevCards=>{
            return prevCards.map(card=>{
              if (card.src === choiceOne.src){
                return {...card,matched:true}
              }
              else{
                return card
              }
            })
          })
          resetTurn();
        }
        else{
          console.log("cards does not matched");
          setTimeout(()=>resetTurn(),1000);
        }
      }
    },[choiceOne,choiceTwo])

    useEffect(()=>{
      shuffleCards()
    },[])

  const shuffleCards=()=>{
    const suffledCards=[...cardImages,...cardImages]
      .sort(()=>Math.random()-0.5)
      .map((card)=>({...card,id:Math.random()}))
      setCards(suffledCards)
      setTurns(0)
      setChoiceOne(null);
      setChoiceTwo(null)
  }
  console.log(cards,turns);
  return (
    <div className='App'>
      <h1>Magic match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card=>(
          <SingleCard  key={card.id} 
          handleChoice={handleChoice}
           card={card}
           flipped={card===choiceOne || card===choiceTwo || card.matched}
           disabled={disabled}
           />
        ))}

      </div>
      <p>Truns: {turns}</p>
    </div>
  )
}
