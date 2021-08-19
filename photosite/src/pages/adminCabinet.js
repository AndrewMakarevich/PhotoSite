import React, { useEffect } from 'react';

import AddTypeModalWindow from '../components/adminCabinet/addTypeModalWindow';

import toggleModalWindow from '../components/adminCabinet/modalWindowScript';

const AdminCabinet = () => {
    useEffect(() => {
        toggleModalWindow();
    }, []);
    return (
        <div>ADMIN
            <button className="openAddTypeModalButton">Add type</button>
            <AddTypeModalWindow />
        </div>

    )
}

export default AdminCabinet;