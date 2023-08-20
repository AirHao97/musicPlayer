import {useRoutes} from 'react-router-dom'
import routerSet from './pages'

import './App.css'

function App() {

  const element = useRoutes(routerSet)

  return (
    <div className="app">
      {element}
    </div>
  );
}

export default App;
