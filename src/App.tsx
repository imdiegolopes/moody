import { useEffect, useState } from "react";
import moodyLogo from "./assets/moody.png";
import "./App.css";
import { FaPen, FaPenFancy, FaTrash } from "react-icons/fa";

import Sentiment from "sentiment";
import { createMood, getMoods } from "./services/mood";
import { debounce } from "./helpers/debounce";
import { Header, History, LastActivity, Row, Tag, TagColor, Tags, Text, Textarea, Title } from "./App.styles";



function App() {
  const initialMoodState = {
    activity: "",
    comments: "",
    date: new Date().toUTCString(),
    feeling: "",
    intensity: 0,
  };
  const [moods, setMoods] = useState<GetMoodOutput[]>();
  const [mood, setMood] = useState<PostMoodInput>(initialMoodState);
  const [tags, setTags] = useState<string[]>([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    console.log("mounted");

    handleGetMoods();
  }, []);

  const handleGetMoods = async () => {
    const moods = await getMoods();

    if (moods.length > 0) {
      setMoods(moods);
    }
  };

  useEffect(() => {
    console.log("mood changed", moods);
  }, [moods]);

  const getColorFromIntensity = (score: number) => {
    if (score > 7) {
      return "green";
    } else if (score < 2) {
      return "red";
    } else {
      return "orange";
    }
  };

  const handleAddMood = async () => {
    await createMood(mood);
    handleGetMoods();
    setMood(initialMoodState);
  };

  const handleRemoveMood = (id: string) => {
    const response = fetch(`http://localhost:5000/v1/moods/${id}`, {
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        handleGetMoods();
      });
  };

  useEffect(() => {
    if (mood && mood.activity && mood.activity.length > 0) {
      const sentiment = new Sentiment();
      const result = sentiment.analyze(mood.activity);

      debounce(
        setMood({
          ...mood,
          intensity: result.score,
        }),
        500
      );
    }
  }, [mood.activity]);

  const handleTag = (tag: string) => {
    if (!tag) {
      throw new Error("Tag is required");
    }

    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }

    setMood({
      ...mood,
      feeling: tags.join(","),
    });
  };

  const handleTagIsActive = (tag: string) => {
    return tags.includes(tag);
  };

  return (
    <>
      <Header>
        <img src={moodyLogo} className="logo" alt="Vite logo" />
        <Title>Moody</Title>
      </Header>

      <section>
        <h2>Welcome!</h2>

        <div>
          <Text>Write about your day...</Text>
          <Textarea
            onChange={(input) =>
              setMood({
                ...mood,
                activity: input.target.value,
              })
            }
          ></Textarea>
        </div>
        <div>
          <Text>How did you feel?</Text>
          <Tags>
            <Tag
              onClick={() => handleTag("energized")}
              active={handleTagIsActive("energized")}
            >
              <TagColor color={"green"}></TagColor> Energized
            </Tag>
            <Tag
              onClick={() => handleTag("happy")}
              active={handleTagIsActive("happy")}
            >
              <TagColor color={"green"}></TagColor> Happy
            </Tag>
            <Tag
              onClick={() => handleTag("excited")}
              active={handleTagIsActive("excited")}
            >
              <TagColor color={"green"}></TagColor> Excited
            </Tag>
            <Tag
              onClick={() => handleTag("relaxed")}
              active={handleTagIsActive("relaxed")}
            >
              <TagColor color={"green"}></TagColor> Relaxed
            </Tag>
            <Tag
              onClick={() => handleTag("stressed")}
              active={handleTagIsActive("stressed")}
            >
              <TagColor color={"red"}></TagColor> Stressed
            </Tag>
            <Tag
              onClick={() => handleTag("angry")}
              active={handleTagIsActive("angry")}
            >
              <TagColor color={"red"}></TagColor> Angry
            </Tag>
            <Tag
              active={handleTagIsActive("neutral")}
              onClick={() => handleTag("neutral")}
            >
              <TagColor color={"orange"}></TagColor> Neutral
            </Tag>
            <Tag
              onClick={() => handleTag("sad")}
              active={handleTagIsActive("sad")}
            >
              <TagColor color={"red"}></TagColor> Sad
            </Tag>
            <Tag
              onClick={() => handleTag("depressed")}
              active={handleTagIsActive("depressed")}
            >
              <TagColor color={"red"}></TagColor> Depressed
            </Tag>
          </Tags>
        </div>

        <div>
          <Text>Share any extra comment...</Text>
          <Textarea
            onChange={(input) =>
              setMood({
                ...mood,
                comments: input.target.value,
              })
            }
          ></Textarea>
        </div>

        <Row>
          <Text>Intensity: {mood && mood.intensity}</Text>
          <Text>Entry Date: {date.toLocaleDateString("us-US")}</Text>
        </Row>

        <input
          type="button"
          className="button"
          value="Save"
          onClick={() => handleAddMood()}
        />
      </section>

      {moods && moods.length > 0 && (
        <section>
          <h2>Last Activities</h2>

          <LastActivity>
            {moods &&
              moods.map((mood: any) => {
                return (
                  <History className="history-item">
                    <Row>
                      <div className="intensity">
                        {mood.intensity}{" "}
                        <TagColor
                          color={getColorFromIntensity(mood.intensity)}
                        ></TagColor>{" "}
                      </div>
                      <div className="date">
                        {new Date(mood.date).toLocaleDateString("us-US")}
                      </div>
                    </Row>
                    <div className="activity">{mood.activity}</div>
                    <div className="comments">{mood.comments}</div>

                    <Row>
                      <div>{mood.feeling}</div>
                      <div>
                        {mood && mood.id && (
                          <>
                            <span onClick={() => {}}>
                              <FaPen />
                            </span>
                            <span
                              onClick={() => {
                                handleRemoveMood(mood.id);
                              }}
                            >
                              <FaTrash />
                            </span>
                          </>
                        )}
                      </div>
                    </Row>
                  </History>
                );
              })}
          </LastActivity>
        </section>
      )}
    </>
  );
}

export default App;
