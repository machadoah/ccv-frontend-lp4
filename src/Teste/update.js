import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function Update() {
  const [status, setStatus] = useState({});
  const { id } = useParams();
  const [dados, setDados] = useState({});
  const navigate = useNavigate();

  // Código colocado no useEffect é executado após a montagem deste componente
  useEffect(() => {
    async function consultar() {
      // Consulta a API
      const resposta = await axios.get(`http://localhost:8000/api/vagas/${id}`);
      // Armazena resposta no useState
      setDados(resposta.data.data);
    }
    consultar();
  }, [id]);

  // Chamada a função da API para excluir
  async function excluir() {
    try {
      // Chama função da API para excluir o registro
      const resposta = await axios.delete(`http://localhost:8000/api/vagas/${id}`);
      setStatus(resposta.data);
      console.log(resposta); // pressione F12 e no console veja o que veio da API no backend
      navigate('/teste'); // Redireciona para a página principal após excluir
    } catch (erro) {
      console.error("Erro ao excluir:", erro);
      if (erro.response) {
        console.log("Status da resposta:", erro.response.status);
        console.log("Dados da resposta:", erro.response.data);
      }
      setStatus(`Falha ao excluir`);
    }
  }

  // Chamada a função da API para atualizar
  async function gravar(e) {
    e.preventDefault(); // cancela o submit
    try {
      // Chama função da API enviando o json com os dados do objeto atualizado
      const resposta = await axios.put(`http://localhost:8000/api/vagas/${id}`, dados);
      setStatus(resposta.data);
      console.log(resposta); // pressione F12 e no console veja o que veio da API no backend
    } catch (erro) {
      setStatus(`Falha: ${erro}`);
    }
  }

  return (
    <div>
      <form onSubmit={gravar} className='formulario'>
        Título: <input value={dados.titulo} type="text" required onChange={(e) => setDados({ ...dados, titulo: e.target.value })} />
        <br></br>
        Local: <input value={dados.local} type="text" required onChange={(e) => setDados({ ...dados, local: e.target.value })} />
        <br></br>
        Salário: <input value={dados.salario} type="number" required onChange={(e) => setDados({ ...dados, salario: e.target.value })} />
        <br></br>
        Empresa: <input value={dados.empresa} type="text" required onChange={(e) => setDados({ ...dados, empresa: e.target.value })} />
        <br></br>
        Tecnologias: <input value={dados.tecnologia} type="text" required onChange={(e) => setDados({ ...dados, tecnologia: e.target.value })} />
        <br></br>
        <button type='submit'>Enviar</button>
      </form>
      <button onClick={excluir}>Excluir</button>
      <p>{dados.texto}</p>
      <p>{status.teste}</p>
      <h4>⚠️ Atenção: Todos os campos são de preenchimento obrigatório</h4>
      <p>Texto retornado pela API: {status.dados == null ? "" : status.dados.texto} </p>
      <Link to='/teste'>Voltar</Link>

        <img src="https://as2.ftcdn.net/v2/jpg/02/86/99/45/1000_F_286994549_XpWtlNO1yJqMvTo7lyaBxtRxlw3LQlrn.jpg" ></img>

    </div>
  );
}

export default Update;
