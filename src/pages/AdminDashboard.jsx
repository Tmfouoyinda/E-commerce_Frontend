import { useState, useEffect } from 'react';
import { getProducts, deleteProduct, saveProduct, updateProduct } from '../API/products';
import { getCategories, deleteCategory, saveCategory, updateCategory } from '../API/categories';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { LogOut, Plus, Trash2, Pencil, Check } from 'lucide-react';

function AdminDashboard() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategorySlug, setNewCategorySlug] = useState('');
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductCategoryId, setNewProductCategoryId] = useState('');
    const [newProductSlug, setNewProductSlug] = useState('');
    const [newProductSku, setNewProductSku] = useState('');
    const [newProductStock, setNewProductStock] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('')

    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSaveProduct = async () => {
        try {
            const slug = newProductName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            const sku = 'SKU-' + Date.now();
            
            const newProduct = await saveProduct({
                name: newProductName,
                price: newProductPrice,
                category_id: newProductCategoryId,
                slug: slug,
                sku: sku,
                stock: parseInt(newProductStock, 10) || 0,
                description: newProductDescription
            });
            setProducts((prev) => [...prev, newProduct]);
            setNewProductName('');
            setNewProductPrice('');
            setNewProductCategoryId('');
            setNewProductStock('');
            setNewProductDescription('');
            setShowAddProduct(false);
        } catch (error) {
            console.error(error);
            alert('Erreur lors de la création');
        }
    };


    const handleSaveCategory = async () => {
        try {

            const slug = newProductName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            const newCategory = await saveCategory({ name: newCategoryName, slug: slug });
            setCategories((prev) => [...prev, newCategory]);
            setNewCategoryName('');
            setNewCategorySlug('');
            setShowAddCategory(false);
        } catch (error) {
            alert('Erreur lors de la création', error);
        }
    };


    const handleUpdateProduct = async () => {
        try {
            const slug = newProductName
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/[\s-]+/g, '-');

            const updated = await updateProduct(editingProduct.id, {
            name: newProductName,
            price: parseFloat(newProductPrice),
            category_id: parseInt(newProductCategoryId, 10),
            slug: slug,
            stock: parseInt(newProductStock, 10) || 0,
            description: newProductDescription,
            });

            setProducts((prev) =>
            prev.map((p) => (p.id === editingProduct.id ? updated : p))
            );

            setEditingProduct(null);
        } catch (error) {
            console.error('Erreur lors de la modification', error);
            alert('Erreur lors de la modification');
        }
    };

    const handleUpdateCategory = async () => {
        try {
            const slug = newCategoryName
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/[\s-]+/g, '-');

            const updated = await updateCategory(editingCategory.id, {
            name: newCategoryName,
            slug: slug,
            });

            setCategories((prev) =>
            prev.map((p) => (p.id === editingCategory.id ? updated : p))
            );

            setEditingCategory(null);
            setNewCategoryName('');
        } catch (error) {
            console.error('Erreur lors de la modification', error);
            alert('Erreur lors de la modification');
        }
    };

    const handleDeleteProduct = async (id) => {
        console.log('Suppression du produit', id)
        try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
        console.error('Erreur lors de la suppression du produit', error);
        alert('Erreur lors de la suppression');
        }
    };

    const handleDeleteCategory = async (id) => {
        console.log('Suppression catégorie', id);
        try {
            await deleteCategory(id);
            setCategories((prev) => prev.filter((c) => c.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la catégorie', error);
            alert('Erreur lors de la suppression');
        }
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setShowAddCategory(true);
    };

    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const categoriesData = await getCategories();
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const productsData = await getProducts();
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        };
        fetchProducts();
    }, []);



    return (
        <div className="min-h-screen bg-gray-50">
            <header className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-gray-900">Dashboard Admin</p>

                    <div className="flex items-center gap-4">
                    <p className="hidden sm:block text-xl font-bold text-gray-900">
                        Bonjour, <span className="text-red-700 font-mono">{user.name}</span>
                    </p>

                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-lg text-gray-700 hover:bg-red-600 hover:text-white transition-colors"
                        title="Déconnexion"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                    </div>
                </div>
            </header>



            {/* section Product */}
            <section className="mb-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8 px-7">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 ">Produits</h2>

                    <button
                    onClick={() => {
                        setEditingProduct(null);
                        setShowAddProduct(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                        <Plus size={20}/>
                        Ajouter un produit
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b-2 border-gray-100">
                                <th className="text-left p-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">Nom</th>
                                <th className="text-left p-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">Prix</th>
                                <th className="text-left p-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">Catégorie</th>
                                <th className="text-left p-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">Stock</th>
                                <th className="text-left p-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr
                                key={product.id}
                                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="p-3 font-medium text-gray-900">{product.name}</td>
                                    <td className="p-3 text-gray-700">{parseFloat(product.price).toFixed(2)}</td>
                                    <td className="p-3">
                                        <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-base rounded-full font-medium">
                                            {product.category?.name}
                                        </span>
                                    </td>

                                    <td className="p-3 text-gray-700">{product.stock}</td>

                                    <td className="p-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingProduct(product);
                                                    setNewProductName(product.name);
                                                    setNewProductPrice(product.price)
                                                    setNewProductCategoryId(product.category_id);
                                                    setNewProductDescription(product.description);
                                                    setNewProductStock(product.stock)
                                                }
                                                }
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors text-sm"
                                                >
                                                <Pencil size={14} />
                                                Modifier
                                            </button>

                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm"
                                                >
                                                <Trash2 size={14} />
                                                Supprimer
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>


            {/* Ajoute un produit  */}
            {showAddProduct && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-medium  mb-4">Ajouter un produit</h3>
                        <div className="flex flex-col gap-4">
                            {/* Formulaire pour les produit */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">Nom</label>
                                <input 
                                type="text" 
                                className="w-full border border-gnray-300 rounded-lg px-3 py-2 mt-1"
                                value={newProductName}
                                onChange={(e) => setNewProductName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Prix(€)</label>
                                <input 
                                type="number" 
                                step={1}
                                min={0}
                                className="w-full border border-gnray-300 rounded-lg px-3 py-2 mt-1"
                                value={newProductPrice}
                                onChange={(e) => setNewProductPrice(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Stock</label>
                                <input
                                    type="number"
                                    step={1}
                                    min={0}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                                    value={newProductStock}
                                    onChange={(e) => setNewProductStock(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    maxLength={100}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-3 mt-1 h-30 resize-none"
                                    value={newProductDescription}
                                    onChange={(e) => setNewProductDescription(e.target.value)}
                                    placeholder="Écris la description..."
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Catégorie</label>
                                <select 
                                name="categoru_id"
                                value={newProductCategoryId}
                                onChange={(e) => setNewProductCategoryId(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                                >
                                    <option value="">Choisir une catégorie</option>
                                    {categories.map((category) => (
                                        <option 
                                        key={category.id}
                                        value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                            onClick={() => setShowAddProduct(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
                            >
                                Annuler
                            </button>

                            <button
                            onClick={handleSaveProduct}
                            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Check size={15}/>
                                Enregister
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* modifier un ajouter */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-medium mb-4">Modifier le produit</h3>
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Nom</label>
                                <input 
                                type="text"
                                className="w-full border border-gnray-300 rounded-lg px-3 py-2 mt-1"
                                value={newProductName}
                                onChange={(e) => setNewProductName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Prix(€)</label>
                                <input 
                                type="number"
                                step={1}
                                min={0}
                                className="w-full border border-gnray-300 rounded-lg px-3 py-2 mt-1"
                                value={newProductPrice}
                                onChange={(e) => setNewProductPrice(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Stock</label>
                                <input
                                    type="number"
                                    step={1}
                                    min={0}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                                    value={newProductStock}
                                    onChange={(e) => setNewProductStock(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    maxLength={100}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-3 mt-1 h-30 resize-none"
                                    value={newProductDescription}
                                    onChange={(e) => setNewProductDescription(e.target.value)}
                                    placeholder="Écris la description..."
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Catégorie</label>
                                <select 
                                name="categoru_id"
                                value={newProductCategoryId}
                                onChange={(e) => setNewProductCategoryId(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                                >
                                    <option value="">Choisir une catégorie</option>
                                    {categories.map((category) => (
                                        <option 
                                        key={category.id}
                                        value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                            onClick={() => setEditingProduct(null)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
                            >
                                Annuler
                            </button>

                            <button
                            onClick={handleUpdateProduct}
                            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Check size={15}/>
                                Enregister
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* Section Categorie */}

            <section className="mb-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8 px-7">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Catégories</h2>
                    <button
                    onClick={() => {
                        setEditingCategory(null);
                        setShowAddCategory(true);
                    }}
                    className="flex items-centre  gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                        <Plus size={20}/>
                        Ajouter un catégories
                    </button>
                </div>

                <div className="overflow-w-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b-2 border-gray-100">
                                <th className="text-left p-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">Nom</th>
                                <th className="text-left p-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.map((category) => (
                                <tr 
                                key={category.id}
                                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="p-3 font-medium text-gray-900">{category.name}</td>


                                    <td className="p-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setEditingCategory(category)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors text-sm"
                                                >
                                                <Pencil size={14} />
                                                Modifier
                                            </button>

                                            <button
                                                onClick={() => handleDeleteCategory(category.id)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm"
                                                >
                                                <Trash2 size={14} />
                                                Supprimer
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {showAddCategory && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-medium mb-4">Ajouter une catégorie</h3>
                        
                        <div className="flex flex-col gap-4">
                             {/* Formulaire pour la catégorie */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">Nom</label>
                                <input
                                    type="text"
                                    className="w-full border border-gnray-300 rounded-lg px-3 py-2 mt-1"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowAddCategory(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleSaveCategory}
                                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Check size={15} />
                                Enregister
                            </button>
                        </div>
                    </div>
                </div>
            )}

            
            {/* Modifier une catégorie */}
            {editingCategory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md rounded-xl bg-white p-6">
                        <h3 className="mb-4 text-xl font-medium">Modifier la catégorie</h3>

                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Nom</label>
                                <input
                                    type="text"
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                            onClick={() => setEditingCategory(null)}
                            className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm transition-colors hover:bg-gray-300"
                            >
                            Annuler
                            </button>

                            <button
                            onClick={handleUpdateCategory}
                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
                            >
                            <Check size={15} />
                            Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default AdminDashboard
