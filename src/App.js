import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Card, Input } from "antd";
// import API_SECRET_KEY from "./env";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { weatherApi } from "./Redux/Reducer";
function App() {
  //show loading icon
  const [loading, setloading] = useState(false);
  //  initial weather data
  const [weather, setWeather] = useState("Delhi");
  //Wrong enter key error
  const [keyDownError, setKeyDownError] = useState(null);
  // userinput city name

  const [userInput, setUserInput] = useState("delhi");
  const dispatch = useDispatch();
  //getting api data from store

  const { status, data } = useSelector((state) => state.weatherSlice);
  console.log(status, data);
  useEffect(() => {
    if (userInput) {
      dispatch(weatherApi(userInput));
    }
  }, [userInput]);
  const getWeatherData1 = (e) => {
    if (e.key === "Enter") {
      debugger;
      if (e.target.value === "") {
        setKeyDownError("Please enter the city");
      } else {
        setUserInput(e.target.value);
      }
    } else {
      setKeyDownError("Please Hit Enter After City  Name");
    }
    // setUserInput("");
  };

  // for currentTime and currentDay
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const time = new Date();

  let day = time.getDay();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return (
    <div
      className="App"
      style={{ background: ampm === "pm" ? "black" : "lightblue" }}
    >
      <header className="App-header">
        <Card
          style={{
            width: 300,
            background: ampm === "pm" ? "lightgray" : "lightblue",
          }}
        >
          <Input
            size="normal"
            placeholder="Enter City Press Enter"
            onKeyDown={getWeatherData1}
            prefix={<SearchOutlined />}
            // onChange={(e) => setUserInput(e.target.value)}
          />
          {keyDownError ? (
            <small className="text-danger">{keyDownError}</small>
          ) : null}
          {data.cod === "404" ? <small>{data?.message}</small> : null}
          {status ? (
            <h1>
              <LoadingOutlined />
            </h1>
          ) : (
            <h4>{data?.name}</h4>
          )}
          <h3>
            {hours} : {minutes} {ampm}
          </h3>
          <div className="font">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="120"
              fill="currentColor"
              className="bi bi-cloud-sun"
              viewBox="0 0 16 16"
            >
              <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z" />
              <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
            </svg>
          </div>
          {status ? (
            <h1>
              <LoadingOutlined />
            </h1>
          ) : (
            <h1>{data?.main?.temp}</h1>
          )}
          <h3>
            {days.map((val, index) => {
              if (index === day) {
                return val;
              }
            })}
          </h3>
        </Card>
      </header>
    </div>
  );
}

export default App;
