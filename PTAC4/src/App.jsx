import { useState } from 'react'

import './App.css'

function App() {
  const [ideias, setIdeias] = useState([]);
  const [novaIdeia, setNovaIdeia] = useState("");
  const [erro, setErro] = useState("");

  function AddIdeia(event){
    event.preventDefault();

    if(!novaIdeia.trim()){
      setNovaIdeia("")
      setErro("Digite sua ideia antes de adicionar >:(");
      return;
    }

    const ideia = {
      id: Date.now(),
      text: novaIdeia,
      feita: false
    };

    setIdeias((listaAtual) => [...listaAtual, ideia]);

    setNovaIdeia("");
    setErro("");
  }

  function AlterarEstado(id){
    setIdeias((listaAtual) => 
      listaAtual.map((ideia) => 
        ideia.id == id
          ? { ...ideia , feita: !ideia.feita }
          : ideia
        
      )
    )
  }

  const ideiasCompletadas = ideias.filter((ideia) => ideia.feita).length;

  function LimparTudo() {
    setIdeias([]);
  };

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

          <p className='subtitulo'>coloque aqui todas as ideias que aparecem na sua cachola</p>

          <form onSubmit={AddIdeia}>
            <input
             type="text" 
             placeholder='Digite sua ideia aqui'
             //atributo que não deixa o texto passar de 80 caracteres
             maxLength={80}
             value={novaIdeia} 
             onChange={(event) => {
              setNovaIdeia(event.target.value);
              setErro("")
             }}
            />

            <button 
              type="submit"
              disabled={(novaIdeia.trim()).length > 80}>
              Adicionar
            </button>
          </form>

          {novaIdeia.length == 80 && (
            <p className='contador-caracter'>
              Você atingiu o limite de 80 caracteres
            </p>
          )}

          {novaIdeia.length > 40 && (
            <p className='contador-caracter'>
              {80 - novaIdeia.length} caracteres restantes
            </p>
          )}

          {erro && (
            <div className='div-erro'>
            <p className='erro'>
              {erro}
            </p>
            </div>
          )}

          <ul className='ideia-list'>
            {ideias.map((ideia) => (
              <li key={ideia.id} className='ideia-item'>
                <div className='container-ideia'>
                  <input 
                    type="checkbox" 
                    checked={ideia.feita}
                    onChange={() => {
                      AlterarEstado(ideia.id)
                    }}
                  />

                  <span
                    className={
                      ideia.feita
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

          <footer>
            <span>
              <strong>{ideias.length} ideias</strong> no painel •{" "} 
              <strong>{ideiasCompletadas}</strong> completadas
            </span>

            {ideias.length > 0 && (
              <button
                className='botao-limpar'
                onClick={LimparTudo}
              >
                Limpar Tudo
              </button>
            )}
          </footer>
        </div>
      </div>
    </>
  )
}

export default App
