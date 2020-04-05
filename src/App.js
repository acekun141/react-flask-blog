import React, {useEffect} from 'react';
import Header from './components/Header';
import TodoPage from './pages/TodoPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import LogoutPage from './pages/LogoutPage';
import {useDispatch, useSelector} from 'react-redux';
import {get_user} from './redux/reducer/user/action';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    dispatch(get_user());
  }, [])
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/" component={TodoPage} />
            <Route exact path="/signin" component={SigninPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/logout" component={LogoutPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
export default App;
