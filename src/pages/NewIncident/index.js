import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiKey } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.png';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();
    const ongName = localStorage.getItem('ongName');

    const ongId = localStorage.getItem('ongId');
    const ongEmail = localStorage.getItem('ongEmail');
    const ongSenha = localStorage.getItem('ongSenha');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                    Authorization2: ongEmail,
                    Authorization3: ongSenha,
                }
            })

            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar caso. Tente novamente')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>

                    <img src={logoImg} alt="Cyber Aid" />

                    <h1>Cadastrar novo caso para {ongName}</h1>
                    <p>Descreva os detalhes do caso, em busca de doações.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#66a8de" />
                    Voltar para o perfil de {ongName}
                    </ Link>

                    <Link className="back-link" to="/">
                        <FiKey size={16} color="#66a8de" />
                    Ir para Login
                </ Link>

                </section>

                <form onSubmit={handleNewIncident} >
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Título do caso" />
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição" />
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Valor da doação" />

                    <button className="button" type="submit" >Cadastrar</button>
                </form>
            </div>
        </div>
    )
}  