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
        <>
            <section className="w-full h-screen flex flex-col justify-center items-center bg-soft-white py-10 px-5 720:flex-row 720:justify-around">

                {/* Info Emails */}

                <div className="text-center 720:text-left mb-10 720:mb-0 720:mr-10">
                    <h2 className="font-advercase text-dark-grey text-3xl mb-4">Iniciar Sesion</h2>
                    <p className="font-satoshiR text-dark-grey text-lg mb-2">
                        Probar modo administrador: <span className="block font-satoshiB">admin@nikers.com</span>Contraseña: <span className="font-satoshiB">admin123</span>
                    </p>
                    <p className="font-satoshiR text-dark-grey text-lg mt-5">
                        Probar modo usuario: <span className="block font-satoshiB">user@nikers.com</span>Contraseña: <span className="font-satoshiB">user123</span>
                    </p>
                </div>

                {/* Login Form */}

                <div className="w-full max-w-sm">
                    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-dark-grey text-sm font-bold mb-2" htmlFor="email">
                                Correo Electrónico
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-dark-grey leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="tu@correo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-dark-grey text-sm font-bold mb-2" htmlFor="password">
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
            </section>
            <Footer />
        </>
    );
}

export default Login;