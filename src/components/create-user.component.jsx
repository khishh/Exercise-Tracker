import React, { useState } from "react";
import axios from "axios";

function CreateUser() {

    const [username, setUsername] = useState('');

    const onUserFormSubmit = event => {
        event.preventDefault();
        
        const newUser = {
            username: username
        };

        console.log(newUser);

        axios.post('http://localhost:3000/users/add', newUser)
            .then(data => console.log(data));

        setUsername('');
    }

    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={onUserFormSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateUser;