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
            const resposta = await axios.get(`http://localhost:8000/api/vagas/${id}`)
            // Armazena resposta no useState
            setDados(resposta.data.data)
        }
        consultar();
    })

    return(
        <div>
            <form onSubmit={gravar} className='formulario'>
                titulo: <input value={dados.titulo} type="text" required onChange={ (e)=>setDados({...dados,titulo:e.target.value}) }/>
                <br></br>
                local: <input value={dados.local} type="text" required onChange={ (e)=>setDados({...dados,local:e.target.value}) }/>
                <br></br>
                salario: <input value={dados.salario} type="number" required onChange={ (e)=>setDados({...dados,salario:e.target.value}) }/>
                <br></br>
                empresa: <input value={dados.empresa} type="text" required onChange={ (e)=>setDados({...dados,empresa:e.target.value}) }/>
                <br></br>
                tecnologias: <input value={dados.tecnologia} type="text" required onChange={ (e)=>setDados({...dados,tecnologia:e.target.value}) }/>
                <br></br>
                <button type='submit'>Enviar</button> 
                <br></br>
            </form>
            <p>{dados.texto}</p>
            <p>{status.teste}</p>
            <h4>⚠️ Atenção: Todos os campos são de preenchimento obrigatório</h4>
            <p>Texto retornado pela API: {status.dados == null ? "" : status.dados.texto} </p>
            <Link to='/teste'>Voltar</Link>
        </div>
    )

    // Chamada a função da API
    async function gravar(e){
        e.preventDefault(); // cancela o submit
        try{
            // Chama função da API enviando o json com os dados do novo objeto
            const resposta = await axios.put(`http://localhost:8000/api/vagas/${id}`,dados);
            setStatus(resposta.data);
            console.log(resposta); // pressione F12 e no console veja o que veio da API no backend
        } catch(erro) {
            setStatus(`Falha: ${erro}`);
        }
    }

}
export default Update