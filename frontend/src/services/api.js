const API_URL = 'http://localhost:8080/api';

export const fetchProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
};

export const fetchProductsByCategory = async (categoryId) => {
    const response = await fetch(`${API_URL}/products/category/${categoryId}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
};

export const fetchCategories = async () => {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
};

export const createProduct = async (productData) => {
    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
};
