import axios from 'axios';
import {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import './style.css';

function Store()
{
    const [status,setStatus] = useState("");

    const titulo = useRef("");
    const descricao = useRef("");
    const localizacao = useRef("");
    const nivel = useRef("");
    const contrato = useRef("");
    const salario = useRef();
    const empresa = useRef("");
    const tecnologias = useRef("");
    const site = useRef("");
    const defaultValue = '';
    const defaultValueNum = 0;

    return(
        <div>
            <h1>Cadastro de Vaga</h1>

            <form onSubmit={ gravar } className='formulario'>

                Titulo: <input ref={titulo} type="text" />
                <br></br>
                Descrição: <input ref={descricao} type="textarea" defaultValue={defaultValue}/>
                <br></br>
                Localização: <input ref={localizacao} type="text"/>
                <br></br>
                Nível: <input ref={nivel} type="text" defaultValue={defaultValue}/>
                <br></br>
                Contrato: <input ref={contrato} type="text"/>
                <br></br>

                Salário: <input ref={salario} type="number" defaultValue={defaultValueNum}/>
                <br></br>

                Empresa: <input ref={empresa} type="text"/>
                <br></br>

                Tecnologias: <input ref={tecnologias} type="text"/>
                <br></br>

                Site: <input ref={site} type="text"/>
                <br></br>


                <button type='submit'>Enviar</button>
            </form>

            <h3>{status}</h3>

            <Link to='/teste'>Voltar</Link>

        </div>
    )

    async function gravar(e){
        e.preventDefault();
        try{

            const json = {
                titulo: titulo.current.value,
                descricao: descricao.current.value,
                localizacao: localizacao.current.value,
                nivel: nivel.current.value,
                contrato: contrato.current.value,
                salario: salario.current.value,
                empresa: empresa.current.value,
                tecnologias: tecnologias.current.value,
                site: site.current.value,
            }
                          
            const resposta = await axios.post('http://localhost:8000/vagas',json);
            setStatus("Cliente cadastrado");

            // pressione F12 e no console veja o que veio da API no backend
            console.log(resposta); 
        
        } catch(erro) {
            setStatus("Falha ao cadastrar cliente");
        }
    }
}
export default Store