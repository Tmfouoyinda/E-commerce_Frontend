import axios from '../API/axios';


const getCategories = async () => {
    try {
        const response = await axios.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

const deleteCategory = async (id) => {
    try {
        await axios.delete(`/categories/${id}`);
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};

const saveCategory = async (category) => {
    try {
        const response = await axios.post('/categories', category);
        return response.data;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

const updateCategory = async (id, category) => {
    try {
        const response = await axios.put(`/categories/${id}`, category);
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};


export { getCategories, deleteCategory, saveCategory, updateCategory };