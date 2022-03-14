import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


const Todo = ({ item }) => {

    const { _id, name } = item;

    const [info, setInfo] = useState({})
    const [updateitem, setUpdateitem] = useState({})
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    const handleBlur = (e) => {
        const newInfo = { ...info }
        newInfo[e.target.name] = e.target.value
        setInfo(newInfo)
    }

    const deleteItem = (id) => {
        fetch(`https://plucky-fluoridated-spatula.glitch.me/deleteitem/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                window.location.reload();
                console.log("delete")
            })
    }


    const getUpdateItem = (id) => {
        openModal()
        fetch(`https://plucky-fluoridated-spatula.glitch.me/getupdateitem/${id}`)
            .then(res => res.json())
            .then(data => {
                setUpdateitem(data)
            })
    }

    const updateItem = (e, id) => {
        fetch(`https://plucky-fluoridated-spatula.glitch.me/updateitem/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(info),
            headers: { 'Content-type': 'application/json' }
        })
            .then((res) => res.json())
            .then((data) => {
                window.location.reload();
                // alert("update done!")
            });
        e.preventDefault()
        console.log(id, info)
    }

    return (
        <div className="todo-box d-flex justify-content-between">
            <div className="todo-head">
                <p>{name}</p>
            </div>
            <div className="todo-footer">
                <i class="fa-solid fa-pen-to-square" onClick={() => getUpdateItem(_id)}></i>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                    <i class="fa-solid fa-xmark" onClick={closeModal}></i>
                    <h6>update your information</h6>
                    <form action="">
                        <input required onBlur={handleBlur} type="text" name="name" className='update-input' />
                        <i class="fa-solid fa-wrench" onClick={(e) => updateItem(e, _id)}></i>
                    </form>
                </Modal>
                <i class="fa-solid fa-trash-can" onClick={() => deleteItem(_id)}></i>
            </div>
        </div>
    );
};

export default Todo;