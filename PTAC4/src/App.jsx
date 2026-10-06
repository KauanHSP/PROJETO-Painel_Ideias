import { useState } from 'react'

import './App.css'

function App() {
  const [ideias, setIdeias] = useState([]);
  const [novaIdeia, setNovaIdeia] = useState("");
  const [erro, setErro] = useState("");

  let nextId = 1;

  function AddIdeia(event){
    event.preventDefault();

    if(!novaIdeia.trim()){
      setErro("Digite sua ideia antes de adicionar >:(");
      return;
    }

    const ideia = {
      id: nextId++,
      text: novaIdeia,
      completada: false
    };

    setIdeias((listaAtual) => [...listaAtual, ideia]);

    setNovaIdeia("");
    setErro("");
  }

  return (
    <>
      <div className='container'>
        <div className='painel'>

          <h1>Painel Das Ideias</h1>

          <p className='subtitulo'>coloque aqui todas as ideia que aparecem na sua cachola :)</p>

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
        </div>
      </div>
    </>
  )
}

export default App
