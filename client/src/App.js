import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import SideBar from './components/SideBar/SideBar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import ModelPage from './pages/ModelPage/ModelPage';
import UploadPage from './pages/UploadPage/UploadPage';
import FilesPage from './pages/FilesPage/FilesPage';

import 'antd/dist/antd.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar />
        <Layout className='site-layout'>
          <Header />

          <Switch>
            <Route path='/' exact>
              <SearchPage />
            </Route>
            <Route path='/search'>
              <SearchPage />
            </Route>
            <Route path='/models'>
              <ModelPage />
            </Route>
            <Route path='/upload'>
              <UploadPage />
            </Route>
            <Route path='/files'>
              <FilesPage />
            </Route>
          </Switch>

          <Footer />
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
