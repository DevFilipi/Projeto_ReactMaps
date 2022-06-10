import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/SearchBoxBus.css";

function SearchBoxBus({dataBus, LatLng}) {
  const [inputSearchBus, setInputSearchBus] = useState("");
  const [filterSearchBus, setFilterSearchBus] = useState([]);
  const [filterLatLng, setfilterLatLng] = ([])
  
  


  //Filtro de linhas
  const handleFilterBus = (event) => {
    setInputSearchBus(event.target.value);

    const newFilterBus = dataBus.filter((value) => {
      const nomesBus = value.nome
       .toLowerCase()
        .includes(inputSearchBus.toLowerCase());
      const linhasBus = value.codigo
        .toLowerCase()
        .includes(inputSearchBus.toLowerCase());
      return nomesBus || linhasBus;
    });
    
    setFilterSearchBus(newFilterBus);
  };

  //Complete do search 
  function handleClickAutoComplete(value) {
    setInputSearchBus(value.nome);
    setFilterSearchBus([]);
    if(value.id === 5525) {
      const aqui = value.id
      LatLng.forEach((aqui => {
       console.log(LatLng[0].linhas[0].idLinha)
      }))
    }
  }
  

  useEffect(() => {
    if (inputSearchBus === "") {
      setFilterSearchBus([]);
    }
  }, [inputSearchBus]);


  return (
    <>
      <div className="search-input">
        <input
          value={inputSearchBus}
          onChange={handleFilterBus}
          type="text"
          placeholder="Pesquise a linha do onibus..."
        />
      </div>
      {filterSearchBus !== 0 && (
        <div className="data-result">
          {filterSearchBus.map((value) => (
            <div
              key={value.id}
              className="data-item"
              onClick={() => {
                handleClickAutoComplete(value);
              }}
            >
              <p>{value.nome}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchBoxBus;
