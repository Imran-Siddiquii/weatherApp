import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "waether",
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
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bf435e8a5d0df867cc33ef6a3a391b34`
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
