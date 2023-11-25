import axios from 'axios';
import {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import './style.css';

function Store()
{
    const [status,setStatus] = useState("");

    const titulo = useRef("");
    const local = useRef("");
    const salario = useRef();
    const empresa = useRef("");
    const tecnologia = useRef("");
    const defaultValue = '';
    const defaultValueNum = 0;

    return(
        <div>
            <h1>Cadastro de Vaga</h1>

            <form onSubmit={ gravar } className='formulario'>

                Titulo: <input ref={titulo} type="text" defaultValue={defaultValue}/>
                <br></br>

                Localização: <input ref={local} type="text" defaultValue={defaultValue}/>
                <br></br>

                Salário: <input ref={salario} type="number" defaultValue={defaultValueNum}/>
                <br></br>

                Empresa: <input ref={empresa} type="text" defaultValue={defaultValue}/>
                <br></br>

                tecnologia: <input ref={tecnologia} type="text" defaultValue={defaultValue}/>
                <br></br>

                <button type='submit'>Enviar</button>
            </form>

            <h3>{status}</h3>
            <h4>⚠️ Atenção: Todos os campos são de preenchimento obrigatório</h4>

            <Link to='/teste'>Voltar</Link>

            <br></br>

            <img src="https://www.alphapaw.com/wp-content/uploads/2020/01/photo_2020-11-04_15-55-35.jpg" ></img>

        </div>
    )

    async function gravar(e){
        e.preventDefault();
        try{

            const json = {
                titulo: titulo.current.value,
                local: local.current.value,
                salario: salario.current.value,
                empresa: empresa.current.value,
                tecnologia: tecnologia.current.value
            }
                          
            // const resposta = await axios.post('http://localhost:8000/api/vagas',json);
            const resposta = await axios.post('https://ccv-backend-lp4.onrender.com/api/vagas',json);
            setStatus("Vaga adicionada");

            // pressione F12 e no console veja o que veio da API no backend
            console.log(resposta); 
        
        } catch(erro) {
            setStatus("falha ao adicionar vaga");
        }
    }
}
export default Store