import React, { useContext } from 'react'
import { AuthContext } from './navigation/AuthProvider'
import Home from './Pages/Home';
import Login from './Pages/Login';

const App = () => {

    const { user } = useContext(AuthContext);

    if(user){
        return(
            <Home />
        )
    }else{
      return(
        <Login />
    )
    }
}

export default App
