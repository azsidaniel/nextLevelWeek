import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import Home from './pages/Home/Home';
import RegisterRecycler from './pages/RegisterRecycler/RegisterRecycler';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path='/' exact/>
            <Route component={RegisterRecycler} path='/register-recycler'/>
        </BrowserRouter>
    )
}

export default Routes;