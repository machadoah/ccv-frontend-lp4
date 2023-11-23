import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

function Update() {
 
    const [status,setStatus] = useState({});
    const { id } = useParams();
    const [dados,setDados] = useState({});

    // Código colocado no UseEffect é execucato após montagem deste componente
    useEffect( ()=>{

        async function consultar(){
            // Consulta a API
            const resposta = await axios.get(`http://localhost:8000/api/clientes/${id}`)
            // Armazena resposta no useState
            setDados(resposta.data.data)
        }

        consultar();

    } , []  )

    return(
        <div>
            <form onSubmit={gravar} className='formulario'>
                texto: <input value={dados.texto} type="text" required onChange={ (e)=>setDados({...dados,texto:e.target.value}) }/>
                <button type='submit'>Enviar</button>
            </form>
            <p>{dados.texto}</p>
            <p>{status.teste}</p>
            <p>Texto retornado pela API: {status.dados == null ? "" : status.dados.texto} </p>
            <Link to='/teste'>Voltar</Link>
        </div>
    )

    // Chamada a função da API
    async function gravar(e){
        e.preventDefault(); // cancela o submit
        try{
            // Chama função da API enviando o json com os dados do novo objeto
            const resposta = await axios.put(`http://localhost:4000/teste/${id}`,dados);
            setStatus(resposta.data);
            console.log(resposta); // pressione F12 e no console veja o que veio da API no backend
        } catch(erro) {
            setStatus(`Falha: ${erro}`);
        }
    }

}
export default Update