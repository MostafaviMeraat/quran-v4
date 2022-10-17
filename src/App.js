import './App.css';
import Search from './components/Search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sura from './components/Sura';
import Page from './components/Page';


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/'>

            <Route index element={<Search />} />
            <Route path='sura/:id' element={<Sura />} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
