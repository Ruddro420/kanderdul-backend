import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const OrderDetails = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    const getData = () => {
        axios
            .get(`${BASE_URL}/order`)
            .then((response) => {
                setOrder(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const formatDate = (isoDate) => {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(new Date(isoDate));
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = order.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // order confirm
    const orderConfirm = (id) => {
        console.log(id);

        axios
            .post(`${BASE_URL}/order/confirm/${id}`)
            .then(() => {
                getData();
                toast.success('Order Confirmed Successfully');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something Went Wrong');
            });
    };
    // delete order with confirmation
    const deleteOrder = (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            axios
                .delete(`${BASE_URL}/order/delete/${id}`)
                .then(() => {
                    getData();
                    toast.success('Order Deleted Successfully');
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Something Went Wrong');
                });
        }
    };


    return (
        <div>
            {loading ? <Loader /> : (
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Orders</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">View Order</li>
                    </ol>
                    <div className="card mb-5">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#Order ID</th>
                                                <th>Name</th>
                                                <th>Phone</th>
                                                <th>Price</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentOrders.map((item, i) => (
                                                <tr key={i}>
                                                    <td>{item.order_id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.total_price} TK</td>
                                                    <td>{formatDate(item.updated_at)}</td>
                                                    <td>{item.status === 0 ? <span className='bg-danger text-white p-1 rounded'>Pending</span> : <span className='bg-success text-white p-1 rounded'>Confirm</span>}</td>
                                                    <td>
                                                        <Link to={`/single-order-details/${item.id}`}>
                                                            <span className="material-symbols-outlined btn btn-primary btn-sm">visibility</span>
                                                        </Link>
                                                        {
                                                            item.status == 0 ? <span
                                                                onClick={() => orderConfirm(item.id)}
                                                                className="material-symbols-outlined btn btn-success btn-sm ms-2">check</span> :
                                                                <span className='bg-info text-white p-1 ms-2 rounded'>Done</span>
                                                        }

                                                        <span
                                                            onClick={() => deleteOrder(item.id)}
                                                            className="material-symbols-outlined btn btn-danger btn-sm ms-2">delete</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <nav>
                                        <ul className="pagination">
                                            {Array.from({ length: Math.ceil(order.length / ordersPerPage) }, (_, i) => (
                                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                    <button onClick={() => paginate(i + 1)} className="page-link">
                                                        {i + 1}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;
