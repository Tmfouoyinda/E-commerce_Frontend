import { useState, useEffect } from 'react'
import { getProducts } from '../API/products'
import { useCart } from '../context/CartContext'
import { Search, ShoppingCart, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { Avatar } from '../components/avatar'

function Home() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    
    const { addToCart, totalItems, totalPrice } = useCart();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const filteredProducts = products.filter(product => {
        const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = selectedCategory === '' || product.category?.name === selectedCategory;
        return matchSearch && matchCategory;
    });

    const categories = [...new Set(products.map(p => p.category?.name).filter(Boolean))];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                console.log('Products:', products);
                setProducts(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="inline-flex items-center text-base font-semibold tracking-wide rounded-xl bg-gray-900 text-white px-4 py-1.5">ShopEase Store</p>
                            <h1 className="text-xl sm:text-2xl lg:text-3xl text-gray-900 font-bold mt-1">Nos produits</h1>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* Cart Info - Hidden on small mobile */}
                            <div className="hidden sm:block text-right">
                                <p className="text-xs sm:text-sm text-gray-500 font-medium">Panier</p>
                                <p className="text-xs sm:text-sm text-gray-700 font-semibold">
                                    {totalItems} - {totalPrice.toFixed(2)} €
                                </p>
                            </div>

                            

                            {/* Cart Icon */}
                                <Link to="/cart" className="relative">
                                    <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700"/>
                                    {totalItems > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                            {totalItems}
                                        </span>
                                    )}
                                </Link>


                            {/* User Avatar */}
                            {user && (
                                <Avatar
                                    square
                                    initials={user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                                    className="size-8 bg-white text-black dark:bg-black dark:text-white"
                                />
                            )}
                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-red-600 rounded-lg transition-colors text-gray-700 hover:text-white"
                                title="Déconnexion"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Filters Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {/* Category Select */}
                    <select
                        className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Toutes catégories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                                {/* Product Image */}
                                <Link to={`/product/${product.id}`} className="h-40 sm:h-48 bg-gray-100 flex items-center justify-center overflow-hidden hover:bg-gray-50 transition-colors">
                                    {product.image
                                    ? <img src={product.image} alt={product.name} className="h-full w-full object-cover hover:scale-105 transition-transform duration-300" />
                                    : <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300" />
                                }
                                </Link>

                                {/* Product Info */}
                                <div className="p-3 sm:p-4 flex flex-col grow">
                                    <p className="text-xs sm:text-sm text-blue-600 font-medium mb-1">{product.category?.name}</p>
                                    <h3 className="text-xs sm:text-sm text-gray-900 font-semibold mb-2 line-clamp-2">{product.name}</h3>
                                    <p className="text-sm sm:text-base font-bold text-gray-900 mb-3">{product.price} €</p>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 mt-auto"
                                    >
                                        <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        <span className="hidden sm:inline">Ajouter</span>
                                        <span className="sm:hidden">+</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                        <ShoppingCart className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="text-gray-600 text-center">Aucun produit trouvé</p>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Home;
