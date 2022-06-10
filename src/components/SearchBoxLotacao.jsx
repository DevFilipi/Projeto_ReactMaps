import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/SearchBoxLotacao.css";

function SearchBoxLotacao({ dataLotacao }) {
  const [inputSearchLotacao, setInputSearchLotacao] = useState("");
  const [filterSearchLotacao, setFilterSearchLotacao] = useState([]);

  //Filtro de linhas
  const handleFilterLotacao = (event) => {
    setInputSearchLotacao(event.target.value);

    const newFilterLotacao = dataLotacao.filter((value) => {
      const nomesLotacao = value.nome
        .toLowerCase()
        .includes(inputSearchLotacao.toLowerCase());
      const linhasLotacao = value.codigo
        .toLowerCase()
        .includes(inputSearchLotacao.toLowerCase());
      return nomesLotacao || linhasLotacao;
    });

    setFilterSearchLotacao(newFilterLotacao);
  };

  //Complete do search
  function handleClickAutoComplete(value) {
    setInputSearchLotacao(value.nome);
    setFilterSearchLotacao([]);
  }

  useEffect(() => {
    if (inputSearchLotacao === "") {
      setFilterSearchLotacao([]);
    }
  }, [inputSearchLotacao]);

  return (
    <>
      <div className="search-input_lotacao">
        <input
          value={inputSearchLotacao}
          onChange={handleFilterLotacao}
          type="text"
          placeholder="Pesquise sua linha da lotação..."
        />
      </div>
      {filterSearchLotacao !== 0 && (
        <div className="data-result_lotacao">
          {filterSearchLotacao.map((value) => (
            <div
              key={value.id}
              className="data-item_lotacao"
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

export default SearchBoxLotacao;
