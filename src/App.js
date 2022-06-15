import React, { useEffect, useState, useRef } from "react";
import "./assets/App.css";
import {DirectionsRenderer,GoogleMap,useJsApiLoader,} from "@react-google-maps/api";
import axios from "axios";
const URL = "http://www.poatransporte.com.br/php/facades/process.php";


function App() {
  const [linhas, setLinhas] = useState([]);
  const [position, setPosition] = useState({ lat: -30.042987, lng: -51.174271, });
  const [latLng, setLatLng] = useState([]);
  const [cords, setCords] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [filterSearch, setFilterSearch] = useState([]);
  const [DirectionsResponse, setDirectionsResponse] = useState(null);
  const mapRef = useRef(null);
  const { isLoaded } = useJsApiLoader({id: "google-map-script", googleMapsApiKey: "AIzaSyD8_ST4dqmxuAMjXE0RUUDTvHFvHawVqsU",});

  function handleCenter() {
    if (!mapRef.current) return;
    const newPos = mapRef.current.getCenter().toJSON();
    setPosition(newPos);
  }
  function handleLoad(map) { mapRef.current = map;}

  //Puxando as linhas
  useEffect(() => {
    axios.get(URL + "?a=tp&p=").then(({ data }) => {
      setLatLng(data);
    });
    if (inputSearch === "") {setFilterSearch([]);}
  }, [inputSearch]);


  function handleLotacao() {
    axios.get(URL + "?a=nc&p=%&t=l").then(({ data }) => {
      setLinhas(data);
    })
      const cordsLotacao = linhas.filter((value) => {
        const idLotacao = value.id
        if(idLotacao){
          axios.get(`http://www.poatransporte.com.br/php/facades/process.php?a=il&p=${idLotacao}`).then(({ data }) => {
              setCords(data);
            })};
    });
  }
  function handleBus() {
    axios.get(URL + "?a=nc&p=%&t=o").then(({ data }) => {
      setLinhas(data);
    });
  }
  const handleFilter = (event) => {
    setInputSearch(event.target.value);
    const newFilter = linhas.filter((value) => {
      const nomes = value.nome.toLowerCase().includes(inputSearch.toLowerCase());
      const linhas = value.codigo.toLowerCase().includes(inputSearch.toLowerCase());
      return nomes || linhas;
    });
    setFilterSearch(newFilter);
  };

  function handleClickAutoComplete(value) {
    const id = value.id;
    latLng.forEach((terminal) => {
      terminal.linhas.forEach((parada) => {
        if (parada.idLinha === id) {
          axios.get(`http://www.poatransporte.com.br/php/facades/process.php?a=il&p=${parada.idLinha}`).then(({ data }) => {
              setCords(data);
            })};
      });
    });
    setInputSearch(value.nome);
    setFilterSearch([]);
  }


  const origin = Object.values(cords)[0];
  const destination = Object.values(cords)[Object.values(cords).length - 4];
  async function calculateRoute() {
    if (inputSearch !== "") {
      //eslint-disable-next-line no-undef
      const originCords = new google.maps.LatLng(origin.lat, origin.lng);

      //eslint-disable-next-line no-undef
      const destinationCords = new google.maps.LatLng(destination.lat,destination.lng);

      //eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originCords,
        destination: destinationCords,
        //eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);
    }
  }

  return (
    <>
      <div className="map">
        <button className="onibus" onClick={handleBus}>Ônibus</button>
        <button className="lotacao" onClick={handleLotacao}>Lotação</button>
        <div className="menu">
        <div className="search-input">
          <input
            className="input"
            value={inputSearch}
            onChange={handleFilter}
            type="text"
            placeholder="Pesquise a linha..."
          />
        </div>
        {filterSearch !== 0 && (
          <div className="data-result">
            {filterSearch.map((value) => (
              <div key={value.id} className="data-item" onClick={() => {handleClickAutoComplete(value);}}>
                <p>{value.nome}</p>
              </div>
            ))}
          </div>
        )}
        <button className="buttonRoute" onClick={calculateRoute}>Traçar Rota</button>
        </div>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            onLoad={handleLoad}
            onDragEnd={handleCenter}
            center={position}
            zoom={13}
          >
            {DirectionsResponse && (
              <DirectionsRenderer directions={DirectionsResponse} />
            )}
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default App;
