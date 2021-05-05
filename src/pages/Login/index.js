import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.png';
import cyberaidImg from '../../assets/cyberaid.png';

export default function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    //////LOGIN///////////
    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await api.post('sessions', { email, senha });


            localStorage.setItem('ongSenha', senha);
            localStorage.setItem('ongEmail', email);
            localStorage.setItem("ongName", response.data.name);

            history.push('/profile');


        } catch (err) {
            alert("Falha no login, tente novamente.");
        }
    }

    ////////////INTERFACE//////////////
    return (
        <div className="login-container">

            <section className="form">
                <img src={logoImg} alt="CyberAid" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input
                        placeholder="Seu e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Sua senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />

                    <button
                        className="button"
                        type="submit"> Entrar </button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#66a8de" />
                    Não tenho cadastro
                </Link>
                </form>
            </section>

            <img src={cyberaidImg} alt="CyberAid" />

        </div>

    );
};