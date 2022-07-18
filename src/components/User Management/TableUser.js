import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBrands, fetchAllCatrgories, fetchAllCountries, fetchAllVendors, searchVendorChange } from '../../action/actions';
import axios from "axios";
import './TableUser.css'
import ReactPaginate from 'react-paginate';
import { categoriesListSelector, countriesListSelector, vendorsRemainingSelector } from '../../redux/selector';
import ModalConfirm from '../ModalConfirmUser';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
import moment from 'moment';

const initData = {
    Search: "",
    Country: "",
    Inventory: "",
    StateCity: "",
    Address: "",
    Phone: "",
    Memberships: [],
    UserType: [],
    DateType: "R",
    DateRange: ""
}

const UserList = (props) => {
    const [Search, setSearch] = useState("");
    const [StateCity, setStateCity] = useState("");
    const [Address, setAddress] = useState("");
    const [Phone, setPhone] = useState("");

    const [Inventory, setInventory] = useState("");
    const [Country, setCountry] = useState("");
    const [byVendor, setByVendor] = useState({ name: "", id: "", hide: true });
    const [membershipinfo, setMembershipInfo] = useState([]);
    const [usertypeinfo, setUserTypeInfo] = useState([]);
    const [DateRange, setDateRange] = useState([]);
    const [state, setState] = useState(initData);

    const [CheckedAll, setCheckedAll] = useState(true);
    const [UserList, setUserList] = useState([]);
    const [Page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(+0);
    const [totalItem, setTotalItem] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState([]);
    const [dataDeleteLength, setDataDeleteLength] = useState(0);
    const [HideMember, SetHideMenber] = useState(false);
    const [HideUserType, SetHideUserType] = useState(false);
    const [OnOff, SetOnOff] = useState(true);
    const [DateType, SetDateType] = useState("R");
    const { RangePicker } = DatePicker;


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllVendors())
        dispatch(fetchAllCatrgories())
        dispatch(fetchAllBrands())
        dispatch(fetchAllCountries())
    }, [])
    const listCategories = useSelector(categoriesListSelector);
    const listVendors = useSelector(vendorsRemainingSelector);
    const listCountries = useSelector(countriesListSelector);

    const fetchUserData = async () => {
        const res = await axios.post("https://api.gearfocus.div4.pgtest.co/apiAdmin/users/list",
            `{
            "page":${Page},
            "count":${itemsPerPage},
            "search":"${state.Search}",
            "memberships":[${state.Memberships}],
            "types":[${state.UserType}],
            "status":[${state.Inventory}],
            "country":"${state.Country}",
            "state":"${state.StateCity}",
            "address":"${state.Address}",
            "phone":"${state.Phone}",
            "date_type":"${state.DateType}",
            "date_range":[${state.DateRange}],
            "sort":"last_login",
            "order_by":"DESC",
            "tz":7 }`,
            {
                headers: {
                    Authorization: '9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275',
                }
            })
        setUserList(res.data.data)
        setTotalItem(+res.data.recordsFiltered)
        const pc = +res.data.recordsFiltered / itemsPerPage
        setPageCount(Math.round(pc))
    }

    //Call API
    useEffect(() => {
        fetchUserData();
    }, [Page, itemsPerPage, state])

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
            document.getElementById(`users-${id}`).className = ""
        }
    }

    const onChange = (dates, dateStrings) => {
        console.log('ơ thê lại vào đây à ?', dateStrings)
        if (dates) {
            setDateRange(dateStrings.map(i => '"' + i + '"'))
            console.log(dateStrings)
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else {
            console.log('Clear');
            console.log(dateStrings)
            setDateRange([]);
        }
    };

    const handleSearch = () => {
        setState(state => ({
            ...state,
            'Search': Search,
            'Inventory': Inventory,
            'Country': Country,
            'Memberships': membershipinfo,
            'UserType': usertypeinfo,
            'StateCity': StateCity,
            'Address': Address,
            'Phone': Phone,
            'DateType': DateType,
            'DateRange': DateRange
        }));
    }


    const handleChange = (e) => {
        // Destructuring
        const { value, checked, name } = e.target;
        console.log(`e is ${name}`);
        console.log(`${value} is ${checked}`);
        if (name === 'membership') {
            // Case 1 : The user checks the box
            if (checked) {
                setMembershipInfo(
                    membershipinfo => [...membershipinfo, value],
                );
                console.log('membershipinfo-add', membershipinfo)
            }

            // Case 2  : The user unchecks the box
            else {
                setMembershipInfo(
                    membershipinfo => membershipinfo.filter(e => e !== value),
                );
                console.log('membershipinfo-delete', membershipinfo)

            }
        } else {
            if (checked) {
                setUserTypeInfo(
                    usertypeinfo => [...usertypeinfo, value],
                );
                console.log('usertypeinfo-add', usertypeinfo)
            }

            else {
                setUserTypeInfo(
                    usertypeinfo => usertypeinfo.filter(e => e !== value),
                );
                console.log('usertypeinfo-delete', usertypeinfo)

            }
        }

    };

    return (<>
        <div className="padding-left-293">
            <div className="title">Search for users</div>
            <div className="search-conditions-box">
                <ul className="search-conditions">
                    <li className="substring-condition-user">
                        <div className="table-value">
                            <input type="text" placeholder='Search keywords' name="search" onChange={e => setSearch(e.target.value)} id="search-keywords" autoComplete='off' maxLength={255}></input>
                        </div>
                    </li>
                    <li className="memberships-codition">
                        <select name="memberships" id="memberships" defaultValue={'All memberships'} onClick={() => SetHideMenber(!HideMember)}>
                            <option value="0" style={{ display: 'none' }}>All memberships</option>
                        </select>
                        <div className="search-membership-value" style={{ ...HideMember ? { display: '' } : { display: 'none' } }}>
                            <label>Memberships</label><br />
                            <input type='checkbox' name='membership' value='"M_4"' onChange={handleChange} />
                            <label for='gen1'>General</label><br />
                            <label>Pending Memberships</label><br />
                            <input type='checkbox' name='membership' value='"P_4"' onChange={handleChange} />
                            <label for='gen2'>General</label>
                        </div>
                    </li>
                    <li className="memberships-codition">
                        <select name="memberships" id="memberships" defaultValue={'All memberships'} onClick={() => SetHideUserType(!HideUserType)}>
                            <option value="0" style={{ display: 'none' }}>All user types</option>
                        </select>
                        <div className="search-user-types-value" style={{ ...HideUserType ? { display: '' } : { display: 'none' } }}>
                            <label>Memberships</label><br />
                            <input type='checkbox' name='usertype' value='"1"' onChange={handleChange} />
                            <label for='gen1'>Administrator</label><br />
                            <input type='checkbox' name='usertype' value='"3"' onChange={handleChange} />
                            <label for='gen2'>Content management</label><br />
                            <input type='checkbox' name='usertype' value='"2"' onChange={handleChange} />
                            <label for='gen3'>Coupons management</label><br />
                            <input type='checkbox' name='usertype' value='"5"' onChange={handleChange} />
                            <label for='gen4'>Vendor</label><br />
                            <input type='checkbox' name='usertype' value='"6"' onChange={handleChange} />
                            <label for='gen5'>View order reports</label><br />
                            <input type='checkbox' name='usertype' value='"4"' onChange={handleChange} />
                            <label for='gen6' style={{ width: '80%' }}>Volume discount management</label><br />
                            <label>Pending Memberships</label><br />
                            <input type='checkbox' name='usertype' value='"C"' onChange={handleChange} />
                            <label for='gen7'>Regisered Customers</label><br />
                            <input type='checkbox' name='usertype' value='"N"' onChange={handleChange} />
                            <label for='gen8'>Anonymous Customers</label>
                        </div>
                    </li>
                    <li className="inventory-codition">
                        <select name="inventory" id="inventory" defaultValue={'Any status'} onChange={e => setInventory(e.target.value)}>
                            <option value="">Any status</option>
                            <option value='"E"'>Enable</option>
                            <option value='"D"'>Disable</option>
                            <option value='"U"'>Unapproved vendor</option>
                        </select>
                    </li>
                    <li className="actions">
                        <button type='submit' className='btn-default' onClick={() => handleSearch()}>Search</button>
                    </li>
                </ul>
                <ul className="search-conditions-hidden">
                    <li className="by_conditions-condition-user">
                        <div className="by_conditions-location">
                            <label>Country</label>
                            <select name="country" id="country" defaultValue={'Select country'} onChange={e => setCountry(e.target.value)}>
                                <option value="all">Select country</option>
                                {listCountries && listCountries.length > 0 && listCountries.map((item, index) => {
                                    return (<option key={`country-${index}`} value={item.code}>{item.country}</option>)
                                })}
                            </select>
                        </div>
                        <div className="by_conditions-location">
                            <label>State</label>
                            <li className="substring-condition-user">
                                <input type="text" name="search" id="search-keywords" onChange={e => setStateCity(e.target.value)} maxLength={255}></input>
                            </li>
                        </div>
                        <div className="by_conditions-location">
                            <label>Address</label>
                            <li className="substring-condition-user">
                                <input type="text" name="search" id="search-keywords" onChange={e => setAddress(e.target.value)} maxLength={255}></input>
                            </li>
                        </div>
                        <div className="by_conditions-location">
                            <label>Phone</label>
                            <li className="substring-condition-user">
                                <input type="text" name="search" id="search-keywords" onChange={e => setPhone(e.target.value)} maxLength={255}></input>
                            </li>
                        </div>
                    </li>
                    <li className="user-activity-condition d-flex">
                        <label style={{ marginRight: '20px' }}>User activity</label>
                        <div style={{ display: 'block' }}>

                            <div style={{ marginBottom: '10px' }}>
                                <input type="radio" style={{ marginRight: '5px' }} checked={OnOff} onChange={() => { SetOnOff(!OnOff); SetDateType("R") }} />Register
                                <input type="radio" style={{ margin: '0px 5px' }} checked={!OnOff} onChange={() => { SetOnOff(!OnOff); SetDateType("L") }} />Last logged in
                            </div>
                            {console.log('lan1', DateRange)}
                            <RangePicker
                                ranges={{
                                    Today: [moment(), moment()],
                                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                                }}
                                showTime
                                format='YYYY-MM-DD'
                                onChange={onChange}
                            />
                        </div>
                    </li>
                </ul>
            </div>
            <div className="actions">
                <Link to="/user/new-user"><button type='submit' className='btn-default'>Add User</button></Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th><input type="checkbox" onClick={() => handle(CheckedAll)}></input></th>
                        <th style={{ cursor: 'pointer' }}>Login/Email</th>
                        <th style={{ cursor: 'pointer' }}>Name</th>
                        <th style={{ cursor: 'pointer' }}>Access level</th>
                        <th>Products</th>
                        <th>Orders</th>
                        <th>Wishlist</th>
                        <th style={{ cursor: 'pointer' }}>Created</th>
                        <th style={{ cursor: 'pointer' }}>Last Login</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {UserList && UserList.length > 0 && UserList.map((item, index) => {
                        return (
                            <tr key={`users-${index}`} id={`users-${item.profile_id}`}>
                                <th><input type="checkbox" name='name[]' id='check_all'></input></th>
                                <td><Link to={`user-detail/${item.profile_id}`}><a className='link'>{item.vendor}</a></Link><div>{item.storeName}</div></td>
                                <td><a className='link'>{(item.fistName ? item.fistName : "") + " " + (item.lastName ? item.lastName : "")}

                                </a></td>
                                <td>{item.access_level}</td>
                                <td><a className='link'>{item.product}</a></td>
                                <td>
                                    {item.order.order_as_buyer === 0
                                        ? <div>{item.order.order_as_buyer}</div>
                                        : <a className='link'>{item.order.order_as_buyer}</a>
                                    }
                                </td>
                                <td><a className='link'>{item.wishlist}</a></td>
                                <td>{item.created !== 0 ? new Date(+item.created * 1000).toLocaleString("en-VN", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true }) : 'Never'}</td>
                                <td>{item.created !== 0 ? new Date(+item.last_login * 1000).toLocaleString("en-VN", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true }) : 'Never'}</td>
                                <td>
                                    <button className='btn-default' onClick={() => {
                                        const element = document.getElementById(`users-${item.profile_id}`);
                                        if (element.className === "") {
                                            element.className = "opacity05";
                                            dataUserDelete.push(`${item.profile_id}`);
                                            setDataDeleteLength(dataUserDelete.length);
                                            console.log(item.profile_id);
                                        } else {
                                            element.className = "";

                                            const index = dataUserDelete.indexOf(`${item.profile_id}`);
                                            if (index > -1) {
                                                dataUserDelete.splice(index, 1);
                                            }
                                            setDataDeleteLength(dataUserDelete.length);
                                            console.log(item.profile_id);
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
                    <li><button type="button" className="btn btn-warning" onClick={() => console.log(dataUserDelete)}>Save changes</button></li>
                    <li><button type="button" className="btn btn-warning" onClick={() => setIsShowModalConfirm(true)}
                        disabled={dataDeleteLength === 0 ? true : false}>Remove selected</button></li>
                    <li><button type="button" className="btn btn-warning">Export all: CSV</button></li>
                </div>
            </div>
        </div>
        <ModalConfirm show={isShowModalConfirm}
            handleClose={() => setIsShowModalConfirm(false)}
            dataUserDelete={dataUserDelete}
            setDataUserDelete={() => setDataUserDelete()}
            setDataDeleteLength={() => setDataDeleteLength()}
            handleOpacity={() => handleOpacity(dataUserDelete)}
            handleFetchData={() => fetchUserData()} />
    </>)
}

export default UserList