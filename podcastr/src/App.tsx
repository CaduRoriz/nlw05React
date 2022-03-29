import './styles/global.css';

import './styles/app.css';

import './components/Header';

import { Header } from './components/Header';
import { Player } from './components/Player';


function App() {
  return (
  <div className = "wrapper" >
    <main>
      <Header />
    </main>
    <Player />
    
  </div>
  );
}

export default App;
