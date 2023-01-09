import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: [],
    status: true,
  },
  reducers: {
    weatherData: (state, { payload }) => {
      state.data = payload;
    },
    waetherStatus: (state, { payload }) => {
      state.status = payload;
    },
  },
});

export const { waetherStatus, weatherData } = weatherSlice.actions;
export default weatherSlice.reducer;

export const weatherApi = (city) => {
  return async function getData(dispatch) {
    dispatch(waetherStatus(true));
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_SECRET_NAME}`
      );
      const data = await res.json();
      dispatch(waetherStatus(false));
      dispatch(weatherData(data));
    } catch (error) {
      dispatch(waetherStatus(false));
      console.log("error");
    }
    dispatch(waetherStatus(false));
  };
};
