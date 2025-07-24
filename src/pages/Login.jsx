import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const result = login(email, password);
        if (result.success) {
            navigate('/');
            setError(result.message);
        }
    };

    return (
        <section className="w-full h-screen flex justify-center items-center bg-soft-white 720:justify-between">

            {/* Background left picture container */}

            <div className='hidden w-1/2 h-full overflow-hidden 720:block'>
                <img src="./images/background/login-bg.avif" alt="Nike Chunky Dunky" className='w-full h-full object-cover' />
            </div>

            {/* Login form container */}

            <div className='w-full h-full flex justify-center items-center 720:w-1/2'>

                <div className='w-4/5 h-full flex flex-col justify-center'>

                    {/* Login Form */}

                    <div className="w-full">

                        {/* Form Title */}

                        <h2 className="font-advercase text-dark-grey text-3xl mb-4">Iniciar Sesion</h2>

                        {/* Login Form */}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-dark-grey text-sm font-satoshiB mb-2" htmlFor="email">
                                    Correo Electrónico
                                </label>
                                <input
                                    className="appearance-none border rounded w-full py-2 px-3 text-dark-grey leading-tight focus:outline-none"
                                    id="email"
                                    type="email"
                                    placeholder="tu@correo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-dark-grey text-sm font-satoshiB mb-2" htmlFor="password">
                                    Contraseña
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-dark-grey mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-dark-grey hover:bg-gray-700 text-soft-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Iniciar Sesión
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Info Emails */}

                    <div className="text-center mt-10 720:text-left flex justify-between gap-4">
                        <p className="font-satoshiR text-dark-grey text-sm mb-2">
                            Correo administrador: <span className="font-satoshiB">admin@nikers.com</span><br/>Contraseña: <span className="font-satoshiB">admin123</span>
                        </p>
                        <p className="font-satoshiR text-dark-grey text-sm">
                            Correo usuario: <span className="font-satoshiB">user@nikers.com</span><br/>Contraseña: <span className="font-satoshiB">user123</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;