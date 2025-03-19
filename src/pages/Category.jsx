import React from 'react';

const Category = () => {
    return (
        <div>
            <div class="container-fluid px-4">
                <h1 class="mt-4">Category</h1>
                <ol class="breadcrumb mb-4">
                    <li class="breadcrumb-item active">Add / View Category</li>
                </ol>
                <div className="card mb-5">
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <form action="">
                                    <div class="form-group">
                                        <label className='mb-2'>Add Category</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Add Category" />
                                    </div>
                                    <button type="submit" class="btn btn-primary mt-3">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <h6>All Category</h6>
                <div className="card">
                    <div className="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>
                                        <span class="material-symbols-outlined btn btn-success btn-sm">
                                            edit
                                        </span>
                                        <span class="material-symbols-outlined btn btn-danger btn-sm ms-2">
                                            delete
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;