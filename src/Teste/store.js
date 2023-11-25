import axios from 'axios';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Store() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const titulo = useRef('');
  const local = useRef('');
  const salario = useRef();
  const empresa = useRef('');
  const tecnologia = useRef('');
  const defaultValue = '';
  const defaultValueNum = 0;

  return (
    <div>
      <h1>Cadastro de Vaga</h1>

      <form onSubmit={gravar} className="formulario">
        Titulo: <input ref={titulo} type="text" defaultValue={defaultValue} />
        <br></br>

        Localização: <input ref={local} type="text" defaultValue={defaultValue} />
        <br></br>

        Salário: <input ref={salario} type="decimal" defaultValue={defaultValueNum} />
        <br></br>

        Empresa: <input ref={empresa} type="text" defaultValue={defaultValue} />
        <br></br>

        Tecnologia: <input ref={tecnologia} type="text" defaultValue={defaultValue} />
        <br></br>

        <button type="submit">Enviar</button>
      </form>

      <h3>{status}</h3>
      {error && <h4 style={{ color: 'red' }}>{error}</h4>}
      {/*<h4>⚠️ Atenção: Todos os campos são de preenchimento obrigatório</h4>*/}

      <Link to="/teste">Voltar</Link>

      <br></br>

      <img src="https://www.alphapaw.com/wp-content/uploads/2020/01/photo_2020-11-04_15-55-35.jpg"></img>
    </div>
  );

  async function gravar(e) {
    e.preventDefault();

    // Validar campos obrigatórios
    if (!titulo.current.value) {
      setError('⚠️ O campo título é obrigatório.');
      return;
    }

    if (!local.current.value) {
        setError('⚠️ O campo localização é obrigatório.');
        return;
    }

    if (!salario.current.value) {
        setError('⚠️ O campo salário é obrigatório.');
        return;
    }

    if (!empresa.current.value) {
        setError('⚠️ O campo empresa é obrigatório.');
        return;
    }

    if (!tecnologia.current.value) {
        setError('⚠️ O campo tecnologia é obrigatório.');
        return;
    }

    // Validar se o salário é um número válido
    if (isNaN(salario.current.value) || salario.current.value < 0) {
      setError('⚠️ O salário deve ser um número válido maior que zero.');
      return;
    }

    try {
      const json = {
        titulo: titulo.current.value,
        local: local.current.value,
        salario: salario.current.value,
        empresa: empresa.current.value,
        tecnologia: tecnologia.current.value,
      };

      const resposta = await axios.post('https://ccv-backend-lp4.onrender.com/api/vagas', json);
      setStatus('Vaga adicionada');

      // Pressione F12 e no console veja o que veio da API no backend
      console.log(resposta);
    } catch (erro) {
      setStatus('Falha ao adicionar vaga');
    }
  }
}

export default Store;
