import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { getProduct } from '../API/products'
import { ShoppingCart, Truck, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext'


function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    const {addToCart,totalItems, totalPrice} = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProduct(id);
                setProduct(product);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">Chargement...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            to="/"
                            className="inline-flex items-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-gray-100 hover:bg-gray-700 transition-colors"
                        >
                            ← Retour
                        </Link>

                        <Link to="/cart" className="relative">
                            <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700" />

                            {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {totalItems}
                            </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Section */}
                    <div className="flex items-center justify-center">
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-full">
                            <div className="aspect-square bg-gray-100 flex items-center justify-center">
                                {product.image ? (
                                    <img src={product.image} alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <ShoppingCart className="w-16 h-16 text-gray-300" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-600 mb-2">
                                {product.category?.name || 'Produit'}
                            </p>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>

                            

                            {/* Price */}
                            <p className="text-3xl lg:text-4xl font-bold text-blue-600 mb-6">
                                {product.price} €
                            </p>

                            {/* Stock Status */}
                            <div className="mb-6 p-3 rounded-lg bg-gray-50 border border-gray-200">
                                <p className="text-sm text-gray-700">
                                    <span className="font-medium">Stock disponible : </span>
                                    <span className={product.stock > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                        {product.stock > 0 ? `${product.stock} article${product.stock > 1 ? 's' : ''}` : 'Rupture de stock'}
                                    </span>
                                </p>
                            </div>

                            {/* Description */}
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {product.description || 'Aucune description disponible.'}
                            </p>

                            {/* Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                                    <div>
                                        <p className="font-medium text-sm text-gray-900">Livraison rapide</p>
                                        <p className="text-xs text-gray-600">Livré en 2-3 jours</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                                    <div>
                                        <p className="font-medium text-sm text-gray-900">Garantie</p>
                                        <p className="text-xs text-gray-600">12 mois de garantie</p>
                                    </div>
                                </div>
                            </div>
                        </div>

        {/* Add to Cart Button */}
                        <button
                            className="w-full py-3  bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
                            disabled={product.stock <= 0}
                            onClick={() => addToCart(product)}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span className="hidden sm:inline">Ajouter</span>
                            <span className="sm:hidden">+</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail


