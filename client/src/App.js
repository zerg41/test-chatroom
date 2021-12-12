// средства маршрутизации
import { Switch, Route } from 'react-router-dom'
// хуки
import { useLocalStorage } from './hooks/useLocalStorage';
// компоненты
import Header from './components/Header';
import Home from './components/Home'
import ChatRoom from './components/ChatRoom'


function App() {

    return(
        <div className='App'>
            <Header />
                <main className="container-fluid">
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        <Route path='/:roomId' exact component={ChatRoom}/>
                    </Switch>
                </main>
            </div>
    );
}

export default App;