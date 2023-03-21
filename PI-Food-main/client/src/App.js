import { Home, Landing, Detail, Form } from './views/index.js';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.jsx';


function App() {

  //para generar el ternario de que muestre la navbar en todo viewport a excepcion de en el landing
  const location = useLocation();

  return (
    <div className="App">
      { location.pathname !== '/' && <NavBar /> }
      <Routes>
        <Route exact path='/' element={<Landing />}/>
        <Route path='/detail/:id' element={<Detail />}/>
        <Route path='/form' element={<Form />}/>
        <Route path='/home' element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
//https://api.spoonacular.com/recipes/complexSearch?apiKey=703de24e59f5471cb2802864fa99a835&number=100&addRecipeInformation=true