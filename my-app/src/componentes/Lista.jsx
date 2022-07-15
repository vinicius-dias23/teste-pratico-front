import React, { useState, useEffect } from 'react';
import { Excluir } from '../metodos/Excluir';
import '../estilo/App.css';
import '../estilo/Adicionar.css';

const Lista = ({ parentToChild }) => {
    const [usuarios, setUsuarios] = useState(undefined);
    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        telefone: '',
        site: '',
    });

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
         .then(response => response.json())
         .then(json => {
            setUsuarios(json);
         });
    }, [])

    return (
        <div className="geral">
            <main>
                <section id="listaUsuarios">
                    <fieldset>
                    <legend>Usuários</legend>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(usuarios) ?
                                usuarios.map((usuario) => (
                                    <tr id={usuario.id} onClick={() => {
                                        setUsuario({
                                            nome: usuario.name,
                                            email: usuario.email,
                                            telefone: usuario.phone,
                                            site: usuario.website,
                                        })
                                    }}>
                                        <td>{usuario.name}</td>
                                        <td>{usuario.email}</td>
                                        <button type="submit" className="botao-excluir" onClick={() => { Excluir(usuario.id) }}>Excluir</button>
                                    </tr>
                                )) : null}
                                {Array.isArray(parentToChild) ?
                                parentToChild.map((novoUsuario) => (
                                    <tr id={novoUsuario.id} onClick={() => {
                                        setUsuario({
                                            nome: novoUsuario.name,
                                            email: novoUsuario.email,
                                            telefone: novoUsuario.phone,
                                            site: novoUsuario.website,
                                        })
                                    }}>
                                        <td>{novoUsuario.name}</td>
                                        <td>{novoUsuario.email}</td>
                                        <button type="submit" className="botao-excluir" onClick={() => { Excluir(novoUsuario.id) }}>Excluir</button>
                                    </tr>
                                )) : null}
                        </tbody>
                    </table>
                    </fieldset>
                    <fieldset className="box-detalhes">
                        <legend>Detalhes</legend>
                        <br />
                        <label>Nome: </label> <label id="nomeDetalhe">{usuario.nome}</label><br />
                        <label>Email: </label> <label id="emailDetalhe">{usuario.email}</label><br />
                        <label>Telefone: </label> <label id="telefoneDetalhe">{usuario.telefone}</label><br />
                        <label>Site: </label> <label id="siteDetalhe">{usuario.site}</label><br />
                    </fieldset>
                </section>
            </main>
        </div>
    );
};

export default Lista;
