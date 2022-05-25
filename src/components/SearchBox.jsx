import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SearchBoxA.css";

function SearchBoxA({ data }) {
  const [inputSearch, setInputSearch] = useState("");
  const [filterSearch, setFilterSearch] = useState([]);

  //Filtro de linhas
  const handleFilter = (event) => {
    setInputSearch(event.target.value);

    const newFilter = data.filter((value) => {
      const nomes = value.nome
        .toLowerCase()
        .includes(inputSearch.toLowerCase());
      const linhas = value.codigo
        .toLowerCase()
        .includes(inputSearch.toLowerCase());
      return nomes || linhas;
    });

    setFilterSearch(newFilter);
  };

  //Complete do search 
  function handleClickAutoComplete(value) {
    setInputSearch(value.nome);
    setFilterSearch([]);
  }


  useEffect(() => {
    if (inputSearch === "") {
      setFilterSearch([]);
    }
  }, [inputSearch]);

  return (
    <>
      <div className="search-input">
        <input
          value={inputSearch}
          onChange={handleFilter}
          type="text"
          placeholder="Pesquise sua linha..."
        />
      </div>
      {filterSearch !== 0 && (
        <div className="data-result">
          {filterSearch.map((value) => (
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

export default SearchBoxA;
