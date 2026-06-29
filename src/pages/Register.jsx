import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ShoppingBag, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import Pexel from '../assets/pexels1.jpg';

function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            setLoading(false);
            return;
        }

        try {
            await register(name, email, password, confirmPassword);
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setLoading(false);
            navigate('/');
        } catch (err) {
            setError(err.message || "Erreur lors de l'inscription");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row">
            {/* Side Image - Hidden on mobile */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
                <img
                    src={Pexel}
                    alt="Boutique mode"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/40 to-black/60" />

                <div className="relative z-10 flex w-full flex-col justify-between p-8 lg:p-12 text-white">
                    <div className="flex w-max items-center gap-3 rounded-lg bg-white/25 px-3 py-2 text-lg lg:text-xl font-bold">
                        <ShoppingBag className="w-6 lg:w-8" />
                        <span className="tracking-wider font-light">
                            ShopEase <span className="font-bold">Store</span>
                        </span>
                    </div>

                    <div className="space-y-4">
                        <div className="h-1 w-12 rounded-full bg-white" />
                        <p className="max-w-xs text-2xl lg:text-3xl font-light leading-snug">
                            Rejoignez notre communauté de <span className="font-bold">clients premium</span>
                        </p>
                        <p className="text-sm text-white/70">
                            Accédez à des offres exclusives et profitez des meilleures ventes.
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

                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Inscription</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-6">
                        Créez un compte pour accéder à vos commandes et offres exclusives
                    </p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Full Name Field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium text-gray-700"
                            >
                                Nom complet
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Jean Dupont"
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    required
                                />
                            </div>
                        </div>

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
                                    type={showPassword ? 'text' : 'password'}
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

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="confirmPassword"
                                className="text-sm font-medium text-gray-700"
                            >
                                Confirmer le mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 mt-1"
                                required
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm text-gray-700"
                            >
                                J'accepte les{' '}
                                <Link
                                    to="/terms"
                                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                >
                                    conditions d'utilisation
                                </Link>
                                {' '}et la{' '}
                                <Link
                                    to="/privacy"
                                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                >
                                    politique de confidentialité
                                </Link>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200"
                        >
                            {loading ? "Inscription en cours..." : "S'inscrire"}
                        </button>

                        {/* Login Link */}
                        <p className="text-sm text-center text-gray-600">
                            Vous avez déjà un compte ?{' '}
                            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                Se connecter
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
