import logo from './logo.svg';
import './App.css';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import NotFoundPage from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/chat" component={Chat} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}

export default App;
