import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './components/layout/NotFound';
import Authentication from './components/auth/Authentication';
import PrivateRoute from './components/routing/PrivateRoute';
import MenuAppBar from './components/layout/MenuAppBar';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import { verifyToken } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import TaskLists from './components/taskList/TaskLists';
import TaskList from './components/taskList/TaskList';

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(verifyToken());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <MenuAppBar />
        <Footer />
        <Alert />
        <Routes>
          <Route path='/' element={<Authentication />} />
          <Route
            path='lists'
            element={<PrivateRoute component={TaskLists} />}
          />
          <Route
            path='lists/:id'
            element={<PrivateRoute component={TaskList} />}
          />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
