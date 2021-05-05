import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';
import './styles.css';

export default function Perfil() {
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');

    const ongId = localStorage.getItem('ongId');
    const ongEmail = localStorage.getItem('ongEmail');
    const ongSenha = localStorage.getItem('ongSenha');

    const [incidents, setIncidents] = useState([]);

    ////////SETANDO OS INCIDENTS QUANDO A PÁGINA FOR INICIADA////////
    useEffect(

        () => {
            api.get('profile', {
                headers: {
                    Authorization: ongEmail,
                    Authorization2: ongSenha
                }
            })
                .then(response => {
                    setIncidents(response.data);
                })
        },
        [ongEmail, ongSenha] // NESSE ARRAY DE DEPENDENCIAS, toda vez que o ongId mudar, a função será executada

    );

    ////////DELETAR////////
    async function handleDeleteincident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    ////////LOGOUT////////
    function handleLogout() {
        localStorage.clear(); //limpa todo o localStorage
        history.push('/');
    }

    ////////INTERFACE////////
    return (

        ///////PÁGINA DE CASOS/////////
        <div className="perfil-container">
            <header>
                <img src={logoImg} alt="CyberAid" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new"> Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button" >
                    <FiPower size={18} color="#66a8de" />
                </button>
            </header>

            {/* /////////TABELAS DE CASOS CADASTRADOS///////////// */}
            <h1>Casos cadastrados de <u>{ongName}</u></h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong> CASO:</strong>
                        <p>{incident.title}</p>

                        <strong> DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong> VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteincident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>

                    </li>
                ))}
            </ul>
        </div>
    );
}