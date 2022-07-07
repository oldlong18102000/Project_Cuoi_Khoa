import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCatrgories } from '../../action/actions';
import axios from "axios";
import './TableProduct.css'
import ReactPaginate from 'react-paginate';
import { categoriesListSelector } from '../../redux/selector';
import ModalConfirm from '../ModalConfirm';
import { Link, NavLink } from 'react-router-dom';

const initData = {
    Search: "",
    Category: "0",
    Availability: "all",
    StockStatus: "all",
    byConditions: ""
}

const ProductList = (props) => {
    const [Search, setSearch] = useState("");
    const [Category, SetCategory] = useState("0");
    const [StockStatus, setStockStatus] = useState("all");
    const [byConditions, setByConditions] = useState("");
    const [Availability, setAvailability] = useState("all");
    const [byVendor, setByVendor] = useState("");
    const [state, setState] = useState(initData);

    const [CheckedAll, setCheckedAll] = useState(true);
    const [ProductList, setProductList] = useState([]);
    const [Page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(+0);
    const [totalItem, setTotalItem] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [dataProductDelete, setDataProductDelete] = useState([]);
    const [dataDeleteLength, setDataDeleteLength] = useState(0);


    const dispatch = useDispatch()

    useEffect(() => { dispatch(fetchAllCatrgories()) }, [])
    const listCategories = useSelector(categoriesListSelector);

    const fetchProductData = async () => {
        const res = await axios.post("https://api.gearfocus.div4.pgtest.co/api/products/list",
            `{
        "page":${Page},
        "count":${itemsPerPage},
        "search":"${state.Search}",
        "category":"${state.Category}",
        "stock_status":"${state.StockStatus}",
        "availability":"${state.Availability}",
        "vendor":"${byVendor}",
        "sort":"name",
        "order_by":"ASC",
        "search_type":"${state.byConditions}"}`,
            {
                headers: {
                    Authorization: '9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275',
                }
            })
        setProductList(res.data.data)
        setTotalItem(+res.data.recordsFiltered)
        const pc = +res.data.recordsFiltered / itemsPerPage
        setPageCount(Math.round(pc))
        setPage(1)
    }

    //Call API
    useEffect(() => {
        fetchProductData();
    }, [Page, itemsPerPage, state, byVendor])//phải truyền vào id của vendor

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
        console.log(event.selected);
    };

    //Check all - Check none
    const handleCheckAll = () => {
        // Lấy danh sách checkbox
        var checkboxes = document.getElementsByName('name[]');

        // Lặp và thiết lập checked
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
        }
        setCheckedAll(false);
    }

    const handleCheckNone = () => {
        // Lấy danh sách checkbox
        var checkboxes = document.getElementsByName('name[]');

        // Lặp và thiết lập Uncheck
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
        setCheckedAll(true);
    }

    const handle = (CheckedAll) => {
        if (CheckedAll === true)
            handleCheckAll()
        else
            handleCheckNone()
    }

    const handleOpacity = (OpacityList) => {
        for (const id of OpacityList) {
            document.getElementById(`products-${id}`).className = ""
        }
    }

    const handleSearch = () => {
        const N = document.getElementById("by-title").checked;
        const S = document.getElementById("by-sku").checked;
        const F = document.getElementById("by-descr").checked;
        const searchvendor = document.getElementById("search-vendor").value;

        let X = ''
        N ? X = X.concat('name,') : X = X.concat('');
        S ? X = X.concat('sku,') : X = X.concat('');
        F ? X = X.concat('description,') : X = X.concat('');
        X = X.slice(0, X.length - 1)

        setState(state => ({
            ...state,
            'Search': Search,
            'Category': Category,
            'Availability': Availability,
            'StockStatus': StockStatus,
            'byConditions': X
        }));
    }
    // handleInputChange = (e, name ) => {
    //     seSet
    // }

    return (<>
        <div className="padding-left-293">
            <div className="title">Products</div>
            <div className="search-conditions-box">
                <ul className="search-conditions">
                    <li className="substring-condition">
                        <div className="table-value">
                            <input type="text" placeholder='Search keywords' name="search" onChange={e => setSearch(e.target.value)} id="search-keywords" autoComplete='off' maxLength={255}></input>
                        </div>
                    </li>
                    <li className="categoryId-codition">
                        <select name="category" id="category" defaultValue={'Any category'} onChange={e => SetCategory(e.target.value)}>
                            <option value="0">Any category</option>
                            {listCategories && listCategories.length > 0 && listCategories.map((item, index) => {
                                return (<option key={`category-${index}`} value={item.id}>{item.name}</option>)
                            })}
                        </select>
                    </li>
                    <li className="inventory-codition">
                        <select name="inventory" id="inventory" defaultValue={'Any inventory'} onChange={e => setStockStatus(e.target.value)}>
                            <option value="all">Any inventory</option>
                            <option value="in">In stock</option>
                            <option value="low">Low stock</option>
                            <option value="out">SOLD</option>
                        </select>
                    </li>
                    <li className="actions">
                        <button type='submit' className='btn-default' onClick={() => handleSearch()}>Search</button>
                    </li>
                </ul>
                <ul className="search-conditions-hidden">
                    <li className="by_conditions-condition">
                        <label>Search in:</label>
                        <ul className='by-conditions'>
                            <li>
                                <input type="checkbox" name="by_title" id="by-title" />
                                <label htmlFor="by-title">Name</label>
                            </li>
                            <li>
                                <input type="checkbox" name="by_sku" id="by-sku" />
                                <label htmlFor="by-sku">SKU</label>
                            </li>
                            <li>
                                <input type="checkbox" name="by_descr" id="by-descr" />
                                <label htmlFor="by-descr">Full Description</label>
                            </li>
                        </ul>
                    </li>
                    <li className="availability-condition d-flex">
                        <label style={{ marginRight: '10px' }}>Availability</label>
                        <select name="availability" id="availability" defaultValue={'Any availability status'}
                            onChange={e => setAvailability(e.target.value)}>
                            <option value="all">Any availability status</option>
                            <option value="1">Only enabled</option>
                            <option value="0">Only disabled</option>
                        </select>
                    </li>
                    <li className="vendor-condition d-flex">
                        <label style={{ marginRight: '10px' }}>Vendor</label>
                        <input type="text" id="search-vendor" autoComplete='off' maxLength={255}></input>
                    </li>
                </ul>
            </div>
            <div className="actions">
                <Link to="/products/new-product"><button type='submit' className='btn-default'>Add Product</button></Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th><input type="checkbox" onClick={() => handle(CheckedAll)}></input></th>
                        <th style={{ cursor: 'pointer' }}>SKU</th>
                        <th style={{ cursor: 'pointer' }}>Name</th>
                        <th>Category</th>
                        <th style={{ cursor: 'pointer' }}>Price</th>
                        <th style={{ cursor: 'pointer' }}>In stock</th>
                        <th style={{ cursor: 'pointer' }}>Vendor</th>
                        <th style={{ cursor: 'pointer' }}>Arrival Date</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {ProductList && ProductList.length > 0 && ProductList.map((item, index) => {
                        return (
                            <tr key={`products-${index}`} id={`products-${item.id}`}>
                                <th><input type="checkbox" name='name[]' id='check_all'></input></th>
                                <td>{item.sku}</td>
                                <td><a className='link' title={`${item.name}`} href='#'>{item.name}</a></td>
                                <td>{item.category}</td>
                                <td>${item.price.slice(0, item.price.indexOf('.', [-1]) + 3)}</td>
                                <td>{item.amount}</td>
                                <td><a className='link' title={`${item.vendor}`} href='#'>{item.vendor}</a></td>
                                <td>{item.arrivalDate !== 0 ? new Date(+item.arrivalDate * 1000).toLocaleString("en-ZA", { month: "short", day: "numeric", year: "numeric" }) : '--'}</td>
                                <td>
                                    <button className='btn-default' onClick={() => {
                                        const element = document.getElementById(`products-${item.id}`);
                                        if (element.className === "") {
                                            element.className = "opacity05";
                                            dataProductDelete.push(`${item.id}`);
                                            setDataDeleteLength(dataProductDelete.length);
                                            console.log(item.id);
                                        } else {
                                            element.className = "";

                                            const index = dataProductDelete.indexOf(`${item.id}`);
                                            if (index > -1) {
                                                dataProductDelete.splice(index, 1);
                                            }
                                            setDataDeleteLength(dataProductDelete.length);
                                            console.log(item.id);
                                            // dataProductDelete = dataProductDelete.split(`${item.id},`).join('');
                                        }
                                    }}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="pagination-bar">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={4}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName='active'
                />
                <div>{totalItem} items</div>
                <select className="pagiSelect" onChange={(e) => setItemsPerPage(e.target.value)} defaultValue={25}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                </select>

            </div>
            <div className="sticky-panel">
                <div className="sticky-panel-content">
                    <li><button type="button" className="btn btn-warning" onClick={() => console.log(dataProductDelete)}>Save changes</button></li>
                    <li><button type="button" className="btn btn-warning" onClick={() => setIsShowModalConfirm(true)}
                        disabled={dataDeleteLength === 0 ? true : false}>Remove selected</button></li>
                    <li><button type="button" className="btn btn-warning">Export all: CSV</button></li>
                </div>
            </div>
        </div>
        <ModalConfirm show={isShowModalConfirm}
            handleClose={() => setIsShowModalConfirm(false)}
            dataProductDelete={dataProductDelete}
            setDataProductDelete={() => setDataProductDelete()}
            setDataDeleteLength={() => setDataDeleteLength()}
            handleOpacity={() => handleOpacity(dataProductDelete)}
            handleFetchData={() => fetchProductData()} />
    </>)
}

export default ProductList