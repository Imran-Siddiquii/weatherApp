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
      setKeyDownError(null);
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
      className="App text-center"
      style={{ background: ampm === "pm" ? "black" : "lightblue" }}
    >
      <header className="App-header d-flex flex-column align-items-center justify-content-center text-white">
        <Card
          style={{
            width: 300,
            background:
              (ampm === "am" && hours > 9) || (ampm === "pm" && hours < 6)
                ? "orange"
                : ampm === "am" && hours < 10
                ? "cyan"
                : "black",
            color: ampm === "pm" && hours < 6 ? "black" : "white",
          }}
        >
          <Input
            status={data.cod === "404" ? "error" : ""}
            size="normal"
            placeholder="Enter City Press Enter"
            onKeyDown={getWeatherData1}
            prefix={<SearchOutlined />}
            // onChange={(e) => setUserInput(e.target.value)}
          />
          {keyDownError ? (
            <small className="text-danger">{keyDownError}</small>
          ) : null}
          {/* {data.cod === "404" ? <small>{data?.message}</small> : null} */}
          {status ? (
            <h1>
              <LoadingOutlined />
            </h1>
          ) : (
            <h4 className="my-3">{data?.name}</h4>
          )}
          <h3 className="my-3">
            {hours} : {minutes} {ampm}
          </h3>
          <div className="font">
            {(ampm === "am" && hours > 9) || (ampm === "pm" && hours < 6) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="120"
                fill="currentColor"
                class="bi bi-brightness-high my-3"
                viewBox="0 0 16 16"
              >
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
              </svg>
            ) : null}
            {ampm === "pm" && hours > 5 && hours < 12 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="120"
                fill="currentColor"
                class="bi bi-moon-stars my-3"
                viewBox="0 0 16 16"
              >
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
              </svg>
            ) : null}
            {ampm === "am" && hours < 10 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="120"
                fill="currentColor"
                className="bi bi-cloud-sun my-3"
                viewBox="0 0 16 16"
              >
                <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z" />
                <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
              </svg>
            ) : null}
          </div>
          {status ? (
            <h1>
              <LoadingOutlined />
            </h1>
          ) : null}
          {data.cod === "404" ? (
            <h4 className="text-danger my-3">City not Found</h4>
          ) : null}
          {!status && data.cod !== "404" ? (
            <h1>{(data?.main?.temp - 273.15).toFixed(2)}°C</h1>
          ) : null}

          <h3 className="my-3">
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
