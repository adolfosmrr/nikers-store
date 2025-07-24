// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { slugify } from '../utils/slugify'; // Asegúrate de que esta importación sea correcta
import Footer from '../components/Footer';

function AdminDashboard() {
    const { user } = useAuth();
    const [sneakers, setSneakers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        images: [], // Puedes manejar esto como strings separados por coma o una selección de archivos
        sizes: [], // '7,8,9' o un array
        newShoes: false,
        gender: '', // 'men' o 'women'
    });
    const [editingProduct, setEditingProduct] = useState(null); // Para guardar el producto que se está editando
    const [showModal, setShowModal] = useState(false); // Para el modal de confirmación de eliminación
    const [productToDelete, setProductToDelete] = useState(null); // Producto a eliminar

    const API_URL = "https://6825fe46397e48c913148b73.mockapi.io/products/v1/sneakers";

    useEffect(() => {
        if (user?.role !== 'admin') {
            // Esto es redundante si se usa PrivateRoute, pero es una capa extra
            setError("Acceso denegado. Solo los administradores pueden ver esta página.");
            setLoading(false);
            return;
        }
        fetchProducts();
    }, [user]);

    const fetchProducts = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Error al cargar los productos');
            const data = await response.json();
            setSneakers(data);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('No se pudieron cargar los productos.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleArrayChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value.split(',').map(item => item.trim()).filter(item => item !== '')
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            return "El nombre es obligatorio.";
        }
        if (parseFloat(formData.price) <= 0 || isNaN(parseFloat(formData.price))) {
            return "El precio debe ser un número mayor a 0.";
        }
        if (formData.description.trim().length < 10) {
            return "La descripción debe tener al menos 10 caracteres.";
        }
        if (!formData.gender) {
            return "El género es obligatorio.";
        }
        if (formData.images.length === 0) {
            return "Se debe especificar al menos una imagen (separadas por coma).";
        }
        if (formData.sizes.length === 0) {
            return "Se debe especificar al menos una talla (separadas por coma).";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        const method = editingProduct ? 'PUT' : 'POST';
        const url = editingProduct ? `${API_URL}/${editingProduct.id}` : API_URL;

        const productData = {
            name: formData.name.trim(),
            price: parseFloat(formData.price),
            description: formData.description.trim(),
            images: formData.images,
            sizes: formData.sizes.map(Number), // Asegurarse de que las tallas sean números
            newShoes: formData.newShoes,
            gender: formData.gender,
            slug: slugify(formData.name.trim()) // Generar el slug
        };

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) throw new Error(`Error al ${editingProduct ? 'actualizar' : 'agregar'} el producto`);

            setSuccessMessage(`Producto ${editingProduct ? 'actualizado' : 'agregado'} exitosamente!`);
            setFormData({ name: '', price: '', description: '', images: [], sizes: [], newShoes: false, gender: '' });
            setEditingProduct(null); // Resetea el modo edición
            fetchProducts(); // Refresca la lista de productos
        } catch (err) {
            console.error(`Error ${method === 'POST' ? 'adding' : 'updating'} product:`, err);
            setError(`Error al ${editingProduct ? 'actualizar' : 'agregar'} el producto: ${err.message}`);
        }
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            description: product.description,
            images: product.images.join(','), // Convertir a string para el input
            sizes: product.sizes.join(','),   // Convertir a string para el input
            newShoes: product.newShoes,
            gender: product.gender,
        });
        setSuccessMessage('');
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll al formulario
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
        setFormData({ name: '', price: '', description: '', images: [], sizes: [], newShoes: false, gender: '' });
        setSuccessMessage('');
        setError('');
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        setError('');
        setSuccessMessage('');
        if (!productToDelete) return;

        try {
            const response = await fetch(`${API_URL}/${productToDelete.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Error al eliminar el producto');

            setSuccessMessage(`Producto "${productToDelete.name}" eliminado exitosamente.`);
            setProductToDelete(null);
            setShowModal(false);
            fetchProducts();
        } catch (err) {
            console.error('Error deleting product:', err);
            setError(`Error al eliminar el producto: ${err.message}`);
        }
    };

    const cancelDelete = () => {
        setProductToDelete(null);
        setShowModal(false);
    };

    if (loading) return <p className="text-center py-20">Cargando panel de administración...</p>;
    if (error && user?.role === 'admin') return <p className="text-center py-20 text-red-500">{error}</p>;
    if (user?.role !== 'admin') return <p className="text-center py-20 text-red-500">Acceso denegado. Solo los administradores pueden ver esta página.</p>;


    return (
        <>
            <section className="w-full max-w-7xl mx-auto py-10 px-5 bg-soft-white">
                <h1 className="font-advercase text-dark-grey text-4xl text-center mb-10">Panel de Administración</h1>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
                {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{successMessage}</div>}

                {/* Formulario para Agregar/Editar Productos */}
                <div className="bg-white shadow-lg rounded-lg p-8 mb-10">
                    <h2 className="font-advercase text-dark-grey text-3xl mb-6">{editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-dark-grey text-sm font-bold mb-2">Nombre:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-dark-grey leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-dark-grey text-sm font-bold mb-2">Precio:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-dark-grey leading-tight focus:outline-none focus:shadow-outline"
                                required
                                min="0.01"
                                step="0.01"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-dark-grey text-sm font-bold mb-2">Descripción:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-dark-grey leading-tight focus:outline-none focus:shadow-outline h-32"
                                required
                                minLength="10"
                            ></textarea>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="images" className="block text-dark-grey text-sm font-bold mb-2">Imágenes (URLs separadas por coma):</label>
                            <input
                                type="text"
                                id="images"
                                name="images"
                                value={formData.images}
                                onChange={handleArrayChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-dark-grey leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="img1.avif,img2.avif,cover.avif"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="sizes" className="block text-dark-grey text-sm font-bold mb-2">Tallas (Números separados por coma):</label>
                            <input
                                type="text"
                                id="sizes"
                                name="sizes"
                                value={formData.sizes}
                                onChange={handleArrayChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-dark-grey leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="7,8,9,10"
                            />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block text-dark-grey text-sm font-bold mb-2">Género:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3 text-dark-grey leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="">Selecciona</option>
                                <option value="men">Hombres</option>
                                <option value="women">Mujeres</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="newShoes"
                                name="newShoes"
                                checked={formData.newShoes}
                                onChange={handleChange}
                                className="mr-2 leading-tight"
                            />
                            <label htmlFor="newShoes" className="text-dark-grey text-sm font-bold">Es un producto nuevo</label>
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                            <button
                                type="submit"
                                className="bg-dark-grey hover:bg-gray-700 text-soft-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                {editingProduct ? 'Guardar Cambios' : 'Agregar Producto'}
                            </button>
                            {editingProduct && (
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="bg-gray-500 hover:bg-gray-600 text-soft-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancelar Edición
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Lista de Productos */}
                <h2 className="font-advercase text-dark-grey text-3xl text-center mb-6">Productos Existentes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sneakers.map(product => (
                        <div key={product.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
                            <img src={product.images.find(img => img.includes('cover.avif')) ? `/images/shoes/${product.images.find(img => img.includes('cover.avif'))}` : '/images/placeholder.avif'} alt={product.name} className="w-32 h-32 object-cover mb-4 rounded" />
                            <h3 className="font-advercase text-xl text-dark-grey mb-2">{product.name}</h3>
                            <p className="font-satoshiR text-lg text-dark-grey mb-2">${product.price}</p>
                            <p className="font-satoshiR text-sm text-gray-600 mb-4 line-clamp-3">{product.description}</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleEditClick(product)}
                                    className="bg-blue-500 hover:bg-blue-600 text-soft-white font-bold py-2 px-4 rounded text-sm"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(product)}
                                    className="bg-red-500 hover:bg-red-600 text-soft-white font-bold py-2 px-4 rounded text-sm"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />

            {/* Modal de Confirmación de Eliminación */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                        <h3 className="font-advercase text-2xl text-dark-grey mb-4">Confirmar Eliminación</h3>
                        <p className="font-satoshiR text-dark-grey mb-6">
                            ¿Estás seguro de que quieres eliminar "{productToDelete?.name}"? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 hover:bg-red-700 text-soft-white font-bold py-2 px-5 rounded"
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-300 hover:bg-gray-400 text-dark-grey font-bold py-2 px-5 rounded"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdminDashboard;