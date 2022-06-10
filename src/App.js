import React, { useEffect, useState } from "react";
import "./assets/App.css";
import SearchBoxBus from "./components/SearchBoxBus.jsx";
import SearchBoxLotacao from "./components/SearchBoxLotacao.jsx";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

function App() {
  const URL = "http://www.poatransporte.com.br/php/facades/process.php";

  //Puxando as linhas
  const [linhasBus, setLinhasBus] = useState([]);
  const [linhasLotacao, setlinhasLotacao] = useState([]);
  const [latLng, setLatLng] = useState([]);

  useEffect(() => {
    axios.get(URL + "?a=nc&p=%&t=o").then(({ data }) => {
      setLinhasBus(data);
    });

    axios.get(URL + "?a=nc&p=%&t=l").then(({ data }) => {
      setlinhasLotacao(data);
    });

    axios.get(URL + "?a=tp&p=").then(({ data }) => {
      setLatLng(data);
    });
    }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD8_ST4dqmxuAMjXE0RUUDTvHFvHawVqsU",
  });
  
  return (
    <>
      <div className="map">
        <SearchBoxBus dataBus={linhasBus} LatLng={latLng} />
        <SearchBoxLotacao dataLotacao={linhasLotacao} LatLng={latLng} />
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
