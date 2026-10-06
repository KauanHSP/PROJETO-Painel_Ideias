import { useState } from 'react'

import './App.css'

function App() {
  const [ideias, setIdeias] = useState([]);
  const [novaIdeia, setNovaIdeia] = useState("");
  const [erro, setErro] = useState("");

  function AddIdeia(event){
    event.preventDefault();

    if(!novaIdeia.trim()){
      setErro("Digite sua ideia antes de adicionar >:(");
      return;
    }

    const ideia = {
      id: Date.now(),
      text: novaIdeia,
      completada: false
    };

    setIdeias((listaAtual) => [...listaAtual, ideia]);

    setNovaIdeia("");
    setErro("");
  }

  function AlterarEstado(id){
    setIdeias((listaAtual) => 
      listaAtual.map((ideia) => 
        ideia.id == id
          ? { ...ideia , completada: !ideia.completada }
          : ideia
        
      )
    )
  }

  function RemoverIdeia(id){
    setIdeias((listaAtual) => 
      listaAtual.filter((ideia) => ideia.id != id)
    )
  }

  return (
    <>
      <div className='container'>
        <div className='painel'>

          <h1>Painel Das Ideias</h1>

          <p className='subtitulo'>coloque aqui todas as ideia que aparecem na sua cachola</p>

          <form onSubmit={AddIdeia}>
            <input
             type="text" 
             placeholder='Digite sua ideia aqui' 
             value={novaIdeia} 
             onChange={(event) => {
              setNovaIdeia(event.target.value);
              setErro("")
             }}
            />

            <button type="submit">
              Adicionar
            </button>
          </form>

          {erro && (
            <p className='erro'>
              {erro}
            </p>
          )}

          <ul className='ideia-list'>
            {ideias.map((ideia) => (
              <li key={ideia.id} className='ideia-item'>
                <div className='container-ideia'>
                  <input 
                    type="checkbox" 
                    checked={ideia.completada}
                    onChange={() => {
                      AlterarEstado(ideia.id)
                    }}
                  />

                  <span
                    className={
                      ideia.completada
                        ? "completada"
                        :  ""
                    }
                  >
                    {ideia.text}
                  </span>
                </div>

                <button
                  className='botao-remover' 
                  onClick={() =>
                    RemoverIdeia(ideia.id)
                  }
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>


        </div>
      </div>
    </>
  )
}

export default App
