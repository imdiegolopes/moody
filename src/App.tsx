import { useEffect, useState } from "react";
import moodyLogo from "./assets/moody.png";
import "./App.css";
import styled from "styled-components";
import { FaPen, FaPenFancy, FaTrash } from 'react-icons/fa';

import Sentiment from "sentiment";

const Title = styled.h1`
  font-size: 2.5em;
  color: #000;
  text-align: center;
`;

const Text = styled.p`
  font-size: 1.1em;
  text-align: left;
  color: #000;
  font-weight: bold;
`;

const Textarea = styled.textarea`
  text-align: left;
  background: transparent;
  border: none;
  border-bottom-color: currentcolor;
  border-bottom-style: none;
  border-bottom-width: medium;
  border-bottom: 1px solid #525252;
  width: 100%;
  inset: unset;
  outline: none;
  color: #000;
`;

const Tag = styled.span`
  display: inline-block;
  color: #000;
  border: 1px solid #000;
  padding: 5px 10px;
  border-radius: 20px;
  margin-right: 5px;
`;
const Tags = styled.div`
  display: flex;
`;

const Header = styled.div`
  display: flex;
  place-items: center;
  text-align: left;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const History =  styled.div`
background: #fff;
border: 1px solid #ccc;
padding: 5px 5px;
border-radius: 10px;
margin: 5px;

`

const LastActivity =  styled.div`
text-align: left;
display: flex;
flex-wrap: wrap;
`

const TagColor = styled.div`
display: inline-block;
width: 10px;
height: 10px;
border-radius: 50%;
background: ${props => props.color};
`;

function App() {
  const [count, setCount] = useState(0);
  const [moods, setMoods] = useState([]);
  const [mood, setMood] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    console.log("mounted");

    const text = "Eu amo o meu trabalho, todos são ótimos lá!";
    const sentiment = new Sentiment();
    const result = sentiment.analyze(text);

    handleGetMoods();

    return () => {
      console.log("unmounted");
    };
  }, []);

  const handleGetMoods = () => {

    const response = fetch("http://localhost:5000/v1/moods").then(
      (response) => {
        return response.json();
      }
    )
    .then((data) => {
      console.log({data})
      console.log
      setMoods(data)
    });
  }


  useEffect(() => {
    console.log("mood changed", moods);
  }, [moods]);

  const getLabelFromIntensity = (score: number) => {
    if (score > 7) {
      return "positive";
    } else if (score < 2) {
      return "negative";
    } else {
      return "neutral";
    }
  }



  const getColorFromIntensity = (score: number) => {
    if (score > 7) {
      return "green";
    } else if (score < 2) {
      return "red";
    } else {
      return "orange";
    }
  }

  const getEmojiFromIntensity = (score: number) => {
    if (score > 7) {
      return "😀";
    } else if (score < 2) {
      return "😞";
    } else {
      return "😐";
    }
  }

  const handleRemoveMood = (id: string) => {
    console.log('Alert')
    const response = fetch(`http://localhost:5000/v1/moods/${id}`, {
      method: 'DELETE',
    }).then(
      (response) => {
        return response.json();
      }
    )
    .then((data) => {
      handleGetMoods();
    })

  }


  return (
    <>
      <Header>
        <img src={moodyLogo} className="logo" alt="Vite logo" />
        <Title>Moody</Title>
      </Header>
      <h2>Welcome!</h2>
      <Text>Write about your day...</Text>
      <Textarea></Textarea>
      <Text>How did you feel?</Text>
      <Tags>
        <Tag><TagColor color={'green'}></TagColor> Energized</Tag>
        <Tag><TagColor color={'green'}></TagColor> Happy</Tag>
        <Tag><TagColor color={'green'}></TagColor> Excited</Tag>
        <Tag><TagColor color={'green'}></TagColor> Relaxed</Tag>
        <Tag><TagColor color={'red'}></TagColor> Stressed</Tag>
        <Tag><TagColor color={'red'}></TagColor> Angry</Tag>
        <Tag><TagColor color={'orange'}></TagColor> Neutral</Tag>
        <Tag><TagColor color={'red'}></TagColor> Sad</Tag>
        <Tag><TagColor color={'red'}></TagColor> Depressed</Tag>
      </Tags>

      <Row>
        <Text>Intensity: 5</Text>
        <Text>Entry Date: {date.toLocaleDateString("us-US")}</Text>
      </Row>

      <input type="button" value="Save" />

      <hr />

      <h2>Last Activities:</h2>

      <LastActivity>
        {moods && moods.map((mood: any) => {
        return (
          <History className="history-item">
            <Row>
              <div className="insentity">{mood.intensity} <TagColor color={getColorFromIntensity(mood.intensity)}></TagColor> </div>
            <div className="date">{new Date(mood.date).toLocaleDateString("us-US")}</div>
            </Row>
            <div className="insentity">{mood.activity}</div>
            <div className="insentity">{mood.comments}</div>
            
            <Row>
              <div>
                #{mood.feeling}
                </div>  
                <div>
                  <FaPen/>
                  {mood && mood.id && <FaTrash onClick={handleRemoveMood(mood.id)}/> }
                </div>
            </Row> 
          </History>
       
       )})}

      </LastActivity>
    </>
  );
}

export default App;
