import React, { useEffect, useState } from "react";
import "./assets/App.css";
import SearchBoxA from "./components/SearchBox";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

function App() {
  
  //Puxando as linhas
  const [linhas, setLinhas] = useState([]);

  useEffect(() => {
    axios.get("http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%&t=o")
    .then(({ data }) => { setLinhas(data);});
  }, []);


  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD8_ST4dqmxuAMjXE0RUUDTvHFvHawVqsU",
  });
  return (
    <>
      <div className="map">
        <SearchBoxA data={linhas} />
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{
              lat: -29.981943,
              lng: -51.192473,
            }}
            zoom={15}
          ></GoogleMap>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default App;
