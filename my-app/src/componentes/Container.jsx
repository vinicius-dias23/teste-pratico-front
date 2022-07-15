import React, { Fragment, useState } from 'react';
import swal from 'sweetalert';
import Lista from './Lista';
import '../estilo/App.css';
import '../estilo/Adicionar.css';

const Container = () => {
  const [formAdicionar, setFormAdicionar] = useState(false);
  const [tituloPagina, setTituloPagina] = useState(false);
  const [campoNome, setCampoNome] = useState('');
  const [campoEmail, setCampoEmail] = useState('');
  const [campoTelefone, setCampoTelefone] = useState('');
  const [campoSite, setCampoSite] = useState('');
  const [data] = useState([]);

  const gravar = () => {
    if (campoNome === '' || campoEmail === '' || campoTelefone === '' || campoSite === '') {
      swal("Atenção!", "Preencha todos os campos antes de gravar o usuário", "info");
    } else {
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
            name: campoNome,
            email: campoEmail,
            phone: campoTelefone,
            website: campoSite,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then(json => {
        data.push(json);
      });
      swal("Sucesso!", "Usuário Cadastrado", "success");
    }

  };

    return (
      <Fragment>

        <header>
          <h1 id="titulo">
            {tituloPagina ?
              'TESTE PRÁTICO - Inclusão de novo usuário (Componente 2)' :
              'TESTE PRÁTICO - Listagem de Usuários (Componente 1)'}
          </h1>
        </header>
    
        {formAdicionar ?
          <section className="hidden" id="formAdicionar">
            <div>
              <fieldset className="form-adicionar">
                  <legend>Adicionar Usuário</legend>
                  <form>
                    <div className="linha-form">
                        <div className="nome-form">
                          <label htmlFor="adicionarNome">Nome: </label><br />
                          <input id="adicionarNome" required onChange={(e) => { setCampoNome(e.target.value) }} />
                        </div>
                        <div className="email-form">
                          <label htmlFor="adicionarEmail">Email: </label><br />
                          <input className="input-email" id="adicionarEmail" required type="email" onChange={(e) => { setCampoEmail(e.target.value) }} />
                        </div>
                    </div>
                    <div className="linha-form">
                        <div className="telefone-form">
                        <label htmlFor="adicionarTelefone">Telefone: </label><br />
                        <input id="adicionarTelefone" required type="tel" placeholder="(00) 00000-0000" onChange={(e) => { setCampoTelefone(e.target.value) }} />
                        </div>
                        <div className="site-form">
                        <label htmlFor="adicionarSite">Site: </label><br />
                        <input className="input-site" id="adicionarSite" required type="url" onChange={(e) => { setCampoSite(e.target.value) }} />
                        </div>
                    </div>

                    <div className="botoes-form">
                      <button className="botao-gravar" type="button" id="botaoGravar" onClick={() => { gravar(); }}>Gravar</button>
                      <button className="botao-cancelar" id="botaoCancelar" onClick={() => { setFormAdicionar(!formAdicionar); setTituloPagina(!tituloPagina); }}>Cancelar</button>
                    </div>
                  </form>
              </fieldset>
            </div>
          </section> : <Lista parentToChild={data} />}

        <button
          className="botao-adicionar"
          id="botaoAdicionar" 
          style={tituloPagina ? { display: 'none' } : null}
          onClick={() => {
            setTituloPagina(!tituloPagina);
            setFormAdicionar(!formAdicionar);
          }}> Adicionar </button>
  
      </Fragment>
    );
};

export default Container;
