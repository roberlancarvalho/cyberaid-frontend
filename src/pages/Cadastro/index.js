import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.png';

export default function Cadastro() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    async function handleCadastro(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
            senha,
        };

        try {
            const response = await api.post('ongs', data);

            history.push('/');
            alert(`Seu ID de acesso: ${response.data.id}`);
        } catch (err) {
            alert('Erro no cadastro. Tente novamente.')
        }
    }

    return (
        <div className="cadastro-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Cyber Aid" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#66a8de" />
                        Voltar
                    </ Link>
                </section>

                <form onSubmit={handleCadastro} >
                    <input placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} />

                    <input type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />

                    <input placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatapp(e.target.value)} />

                    <div className="input-group">
                        <input placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)} />

                        <input placeholder="UF"
                            value={uf} style={{ width: 80 }}
                            onChange={e => setUf(e.target.value)} />
                    </div>

                    <input type="password" placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)} />

                    <button className="button" type="submit" >Cadastrar</button>
                </form>
            </div>
        </div>
    );
}