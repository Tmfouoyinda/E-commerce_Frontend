import { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router';
import { ShoppingBag, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Pexel from '../assets/pexels.jpg';


function Login() {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (!email || !password) {
                setError('Veuillez remplir tous les champs');
                setLoading(false);
                return;
            }

            const loggedUser = await login(email, password);
            setEmail('');
            setPassword('');
            setLoading(false);
            if (loggedUser.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Erreur de connexion');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row">
            {/* Side Image - Hidden on mobile */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
                <img src={Pexel} 
                    alt="Boutique mode" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/40 to-black/60" />

                <div className="relative z-10 flex flex-col justify-between p-8 lg:p-12 text-white w-full">
                    <div className="flex items-center gap-3 text-xl lg:text-2xl font-bold bg-white/25 rounded-lg px-3 py-2 w-max">
                        <ShoppingBag className="w-6 lg:w-8" />
                        <span className="tracking-wider font-light">ShopEase <span className="font-bold">Store</span></span>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-1 bg-white rounded-full" />
                        <p className="text-2xl lg:text-3xl font-light leading-snug max-w-xs">
                            Découvrez le mode <span className="font-bold">haut de gamme</span> à portée de clic.
                        </p>
                        <p className="text-white/70 text-sm">
                            Découvrez notre sélection de produits de qualité supérieure.
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-4 sm:px-6 py-8 lg:py-0">
                <div className="w-full max-w-md">
                    {/* Mobile Header */}
                    <div className="lg:hidden mb-8 flex items-center gap-2">
                        <ShoppingBag className="w-6 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-900">ShopEase</h1>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-6">
                        Entrez vos identifiants pour accéder à votre compte
                    </p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="nom@exemple.com"
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-700"
                            >
                                Mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot Password */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                                <label 
                                    htmlFor="remember"
                                    className="text-sm text-gray-700"
                                >
                                    Se souvenir de moi
                                </label>
                            </div>
                            <Link
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                to="/forgot-password"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200"
                        >
                            {loading ? 'Connexion en cours...' : 'Se connecter'}
                        </button>

                        {/* Sign Up Link */}
                        <p className="text-sm text-center text-gray-600">
                            Pas encore de compte ?{" "}
                            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                S'inscrire
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login