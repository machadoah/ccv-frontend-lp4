import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function Update() {
  const { id } = useParams();
  const [dados, setDados] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    async function consultar() {
      try {
        const resposta = await axios.get(`https://ccv-backend-lp4.onrender.com/api/vagas/${id}`);
        setDados(resposta.data.data);
      } catch (erro) {
        console.error("Erro ao consultar:", erro);
      }
    }
    consultar();
  }, [id]);

  async function excluir() {
    try {
      const resposta = await axios.delete(`https://ccv-backend-lp4.onrender.com/api/vagas/${id}`);
      setStatusMessage(resposta.data.message);
      navigate('/teste');
    } catch (erro) {
      console.error("Erro ao excluir:", erro);
      setStatusMessage(`Falha ao excluir: ${erro.message}`);
    }
  }

  async function gravar(e) {
    e.preventDefault();
    setError(''); // Limpar mensagens de erro

    // Validar campos obrigatórios
    if (!dados.titulo || !dados.local || dados.salario === undefined || !dados.empresa || !dados.tecnologia) {
      setError('⚠️ Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const resposta = await axios.put(`https://ccv-backend-lp4.onrender.com/api/vagas/${id}`, dados);
      setStatusMessage(resposta.data.message);
    } catch (erro) {
      console.error("Erro ao gravar:", erro);
      setStatusMessage(`Falha ao gravar: ${erro.message}`);
    }
  }

  return (
    <div>
      <form onSubmit={gravar} className='formulario'>
        Título: <input value={dados.titulo || ''} type="text" required onChange={(e) => setDados({ ...dados, titulo: e.target.value })} />
        <br></br>
        Local: <input value={dados.local || ''} type="text" required onChange={(e) => setDados({ ...dados, local: e.target.value })} />
        <br></br>
        Salário: <input value={dados.salario || ''} type="number" required onChange={(e) => setDados({ ...dados, salario: e.target.value })} />
        <br></br>
        Empresa: <input value={dados.empresa || ''} type="text" required onChange={(e) => setDados({ ...dados, empresa: e.target.value })} />
        <br></br>
        Tecnologias: <input value={dados.tecnologia || ''} type="text" required onChange={(e) => setDados({ ...dados, tecnologia: e.target.value })} />
        <br></br>
        <button type="submit">Enviar</button>
      </form>
      <button onClick={excluir}>Excluir</button>
      <p>{dados.texto}</p>
      {error && <h4 style={{ color: 'red' }}>{error}</h4>}
      {statusMessage && <p>{statusMessage}</p>}
      <h4>⚠️ Atenção: Todos os campos são de preenchimento obrigatório</h4>
      <p>Texto retornado pela API: {statusMessage}</p>
      <Link to='/teste'>Voltar</Link>

      <br></br>
      <img src="https://as2.ftcdn.net/v2/jpg/02/86/99/45/1000_F_286994549_XpWtlNO1yJqMvTo7lyaBxtRxlw3LQlrn.jpg" alt="Imagem" />
    </div>
  );
}

export default Update;
