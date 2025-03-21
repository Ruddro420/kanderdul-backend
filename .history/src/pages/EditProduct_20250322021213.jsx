import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;
    const { id } = useParams(); // Get product ID from URL

    const [getCategory, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        product_name: '',
        select_category: '',
        availability: '',
        regular_price: '',
        selling_price: '',
        product_description: '',
        product_image: null, // Initialize as null for file input
    });

    // ✅ Fetch categories
    useEffect(() => {
        axios.get(`${BASE_URL}/products/categories`)
            .then((response) => {
                setCategory(response.data[0] || []);
            })
            .catch((error) => console.log(error));
    }, []);

    // ✅ Fetch existing product details
    useEffect(() => {
        axios.get(`${BASE_URL}/products/${id}`)
            .then((response) => {
                setFormData({
                    ...response.data[0],
                    product_image: null, // Reset file input for the existing product
                });
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [id]);

    // ✅ Handle form input changes
    const handleChange = (event) => {
        const { name, value, type, files } = event.target;

        // Check if the input is of type file
        if (type === "file") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0], // Store file object
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value, // Store text input values
            }));
        }
    };

    console.log(formData);

    // ✅ Update Product
    const updateProduct = (e) => {
        e.preventDefault();
        setLoading(true);

        console.log(formData);

        // Ensure you are sending the correct endpoint and data
        axios.post(`${BASE_URL}/product/update/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(() => {
                toast.success('Product updated successfully');
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something went wrong');
                setLoading(false);
            });

    };

    return (
        <div>
            {loading ? <Loader /> : (
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Edit Product</h1>
                    <div className="card mb-5">
                        <div className="card-body">
                            <form onSubmit={updateProduct}>
                                <div className="row">
                                    <div className="col-lg-4 col-sm-12 col-md-4 mt-3 form-group">
                                        <label className="mb-2">Product Name</label>
                                        <input
                                            name="product_name"
                                            value={formData.product_name || ""}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"

                                        />
                                    </div>
                                    <div className="col-lg-4 col-sm-12 col-md-4 mt-3 form-group">
                                        <label className="mb-2">Product Category</label>
                                        <select
                                            name="select_category"
                                            value={formData.select_category || ""}
                                            onChange={handleChange}
                                            className="form-control"

                                        >
                                            <option value="">Select Category</option>
                                            {getCategory.map((item) => (
                                                <option key={item.id} value={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-lg-4 col-sm-12 col-md-4 mt-3 form-group">
                                        <label className="mb-2">Product Availability</label>
                                        <select
                                            name="availability"
                                            value={formData.availability || ""}
                                            onChange={handleChange}
                                            className="form-control"

                                        >
                                            <option value="">Select Availability</option>
                                            <option value="In Stock">In Stock</option>
                                            <option value="Out of Stock">Out of Stock</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6 col-sm-12 col-md-6 mt-3 form-group">
                                        <label className="mb-2">Regular Price</label>
                                        <input
                                            name="regular_price"
                                            value={formData.regular_price || ""}
                                            onChange={handleChange}
                                            type="number"
                                            className="form-control"

                                        />
                                    </div>
                                    <div className="col-lg-6 col-sm-12 col-md-6 mt-3 form-group">
                                        <label className="mb-2">Selling Price</label>
                                        <input
                                            name="selling_price"
                                            value={formData.selling_price || ""}
                                            onChange={handleChange}
                                            type="number"
                                            className="form-control"

                                        />
                                    </div>
                                    <div className="col-lg-12 col-sm-12 col-md-12 mt-3 form-group">
                                        <label className="mb-2">Product Description</label>
                                        <textarea
                                            name="product_description"
                                            value={formData.product_description || ""}
                                            onChange={handleChange}
                                            className="form-control"

                                        ></textarea>
                                    </div>
                                    <div className="col-lg-12 col-sm-12 col-md-12 mt-3 form-group">
                                        <label className="mb-2">Product Image</label>
                                        <input
                                            name="product_image"
                                            type="file"
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    {/* {formData.product_image && (
                                        <div className="col-lg-12 col-sm-12 col-md-12 mt-3 form-group mt-5 mb-3">
                                            <img
                                                style={{ height: '200px', width: '200px' }}
                                                src={`${IMAGE_URL}/admin/product/${formData.product_image}`}
                                                alt="Product Preview"
                                            />
                                        </div>
                                    )} */}
                                    <button type="submit" className="btn btn-primary mt-3">
                                        Update Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProduct;
