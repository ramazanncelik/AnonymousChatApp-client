import React, { useContext, useState } from 'react'
import { AuthContext } from '../navigation/AuthProvider';

const Login = () => {

    const {setUser} = useContext(AuthContext);

    const [userName, setUserName] = useState("");

    const handleSubmit = async()=>{
        if(userName){
            setUser(userName);
            setUserName("");
        }
    }

    return (
        <div className='w-full h-screen flex flex-col space-y-2 bg-slate-700 items-center justify-center'>

            <div className='w-96 h-auto flex flex-col space-y-2'>
                <h1 className='text-white font-bold text-3xl text-center'>Login</h1>

                <input
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    type="text"
                    placeholder='User Name'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />

                <button onClick={handleSubmit} className='w-full p-2 text-white bg-blue-700 rounded-lg hover:bg-blue-600'>
                    Login
                </button>
            </div>

        </div>
    )
}

export default Login
