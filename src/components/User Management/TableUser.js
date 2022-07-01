import Container from 'react-bootstrap/Container'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchAllUsers, fetchAllProducts } from '../../action/actions';
import axios from "axios";
import './TableUser.css'


const UserList = (props) => {
    const [UserList, setUserList] = useState([]);
    const [Page, setPage] = useState(1);

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const res = await axios.post("https://api.gearfocus.div4.pgtest.co/apiAdmin/users/list",
                `{
            "page":${Page},
            "count":25,
            "search":"",
            "memberships":[],
            "types":[],
            "status":[],
            "country":"",
            "state":"",
            "address":"",
            "phone":"",
            "date_type":"R",
            "date_range":[],
            "sort":"last_login",
            "order_by":"DESC",
            "tz":7 }`,
                {
                    headers: {
                        Authorization: '9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275',
                    }
                });
            setUserList(res.data.data)
            // console.log(res.data.data);
        })()
        console.log(Page);
    }, [Page])

    const handleDelete = (id) => {
        console.log('ng dung bi xoa la', id)
        dispatch(deleteUser(id));
    }

    return (<>
        <div className="padding-left-293">
            <div className="title">Search for users</div>
            <table className="table">
                <thead>
                    <tr>
                        <th><input type="checkbox"></input></th>
                        <th>Login/Email</th>
                        <th>Name</th>
                        <th>Access level</th>
                        <th>Products</th>
                        <th>Orders</th>
                        <th>Wishlist</th>
                        <th>Created</th>
                        <th>Last Login</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {UserList && UserList.length > 0 && UserList.map((item, index) => {
                        return (
                            <tr key={`user-${index}`}>
                                <th><input type="checkbox"></input></th>
                                <td><a className='link'>{item.vendor}</a><div>{item.storeName}</div></td>
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
                                <td>{item.created != 0 ? new Date(+item.created * 1000).toLocaleString("en-VN", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true }) : 'Never'}</td>
                                <td>{item.created != 0 ? new Date(+item.last_login * 1000).toLocaleString("en-VN", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true }) : 'Never'}</td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
            <div className='pagination-bar'>
                <button className='btn btn-paginate'><i class="fa-solid fa-angles-left"></i></button>
                <button className='btn btn-paginate' onClick={() => setPage(1)}>1</button>
                <button className='btn btn-paginate' onClick={() => setPage(2)}>2</button>
                <button className='btn btn-paginate' onClick={() => setPage(3)}>3</button>
                <button className='btn btn-paginate' onClick={() => setPage(4)}>4</button>
                <button className='btn btn-paginate' onClick={() => setPage(5)}>5</button>
                <button className='btn btn-paginate' onClick={() => setPage(6)}>6</button>
                <button className='btn btn-paginate' onClick={() => setPage(7)}>7</button>
                <button className='btn btn-paginate'><i class="fa-solid fa-angles-right"></i></button>
            </div>
        </div>
    </>)
}

export default UserList