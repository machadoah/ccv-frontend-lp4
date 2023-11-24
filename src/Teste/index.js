import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import './style.css'

function Teste() {
 
    const [json,setJson] = useState([])

    useEffect( ()=>{

        async function consultar(){

            const resposta = await axios.get("http://localhost:8000/api/vagas")
            // Armazena resposta no useState
            setJson(resposta.data.data)
            console.log(resposta) // pressione F12 e no console veja o que veio da API no backend
        }

        consultar();

    } , []  )

    return(
        <div className='corpo'>
            <Link to='/testeCreate'>Criar Novo</Link>

            <table>
                <thead>
                    <tr>
                        <th>Titulo</th><th>Localização</th><th>Salário</th><th>Empresa</th><th>Tecnologias</th>
                    </tr>
                </thead>
                <tbody>
                    {json==null ? null : json.map( 
                        (x) => 
                        <tr key={x.id}>
                        <td>{x.titulo}</td>
                        <td>{x.local}</td>
                        <td>{x.salario}</td>
                        <td>{x.empresa}</td>
                        <td>{x.tecnologia}</td>
                        <td><Link to={"/testeUpdate/" + x.id}>Alterar</Link></td>
                        </tr> )
                    }
                </tbody>
            </table>
            
            <Link to="/">Voltar</Link>
        </div>
    )
}
export default Teste