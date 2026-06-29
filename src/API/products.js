import axios from '../API/axios';


const getProducts = async () => {
    try {
        const response = await axios.get('/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

const getProduct = async (id) => {
    try {
            const response = await axios.get(`/products/${id}`)
            return response.data; 
    }catch (error) {
            console.error('Error fetching products:', error)
            throw error;
    }
}

const deleteProduct = async (id) => {
    try {
        await axios.delete(`/products/${id}`);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

const saveProduct = async (product) => {
    try {
        const response = await axios.post('/products', product);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`/products/${id}`, product);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export { getProducts, getProduct, deleteProduct, saveProduct, updateProduct };