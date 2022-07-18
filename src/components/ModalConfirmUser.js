import { Modal, Button } from 'react-bootstrap'
import axios from "axios";


const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete, handleOpacity, setDataUserDelete, handleFetchData, setDataDeleteLength } = props;

    const deleteUserData = async () => {
        //const res = await axios.post
        console.log(dataUserDelete)
        const res = await axios.post("https://api.gearfocus.div4.pgtest.co/apiAdmin/users/edit",
            `{"params":[${dataUserDelete.map((item) => { return (`{"id":"${item}","delete":1}`) })}]}`,
            {
                headers: {
                    Authorization: '9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275',
                }
            })
        console.log(dataUserDelete)
        handleOpacity(dataUserDelete)
        handleFetchData()
        setDataUserDelete([])
        setDataDeleteLength(0)
        handleClose()
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteUserData}>
                        YES
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        NO
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfirm;