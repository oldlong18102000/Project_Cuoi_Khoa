import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, deleteUser } from '../action/actions';
import { todosRemainingSelector } from '../redux/selector';

const TableUser = (props) => {

    //const [listUsers, setListUsers] = useState();
    const dispatch = useDispatch()
    // const fetchAllUser = async () => {
    //     const res = await axios.get("http://localhost:8080/users/all");
    //     const data = res && res.data ? res.data : []
    //     setListUsers(data)
    // }

    useEffect(() =>
    // fetchAllUser();
    { dispatch(fetchAllUsers()) }, [])

    //const handleEdit = () => { }
    const handleDelete = (id) => {
        console.log('ng dung bi xoa la', id)
        dispatch(deleteUser(id));
    }
    //const listUsers = useSelector((state) => state.user.listUsers)
    const listUsers = useSelector(todosRemainingSelector);

    return (
        <Container>
            <hr />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Client</th>
                        <th>Currency</th>
                        <th>Total</th>
                        <th>Invoice#</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                        return (
                            <tr key={`users-${index}`}>
                                <td>{item.status}</td>
                                <td>{new Date(item.createdAt).toLocaleString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}</td>
                                <td>{item.client}</td>
                                <td>{item.currentcy}</td>
                                <td>{item.total}</td>
                                <td>{item.invoice}</td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>

    )
}

export default TableUser