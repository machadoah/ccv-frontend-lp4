import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Menu from './Menu';
import Home from './Home';
import Teste from './Teste';
import Show from './Teste/show';
import Store from './Teste/store';
import Update from './Teste/update';

function App() {
  return (
    <BrowserRouter>
    <Menu/>
    <Routes>
      <Route path="/" element={ <Home />  } />
      <Route path="/teste" element={ <Teste />  } />
      <Route path="/teste/:id" element={ <Show />  } />
      <Route path="/testeCreate" element={ <Store />  } />
      <Route path="/testeUpdate/:id" element={ <Update />  } />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
