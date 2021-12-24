import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

function EditExercise() {

    const [exercise, setExercise] = useState(
        {
            username: '',
            description: '',
            duration: 0,
            date: null,
        }
    );

    const [users, setUsers] = useState([]);
    const { username, description, duration, date } = exercise;

    const id = useParams().id;
    
    useEffect(() => {
        axios.get(`http://localhost:3000/exercises/${id}`)
            .then(response => {
                console.log(response.data);
                const {username: _username, description: _description, duration: _duration, date: _date} = response.data;
                setExercise({ username: _username, description: _description, duration: _duration, date: new Date(_date) });
            });
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:3000/users/`)
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data);
                }
            });
    }, []);

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        axios.post(`http://localhost:3000/exercises/update/${id}`, exercise)
            .then(response => console.log(response));
        window.location = '/';
    }

    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={handleEditFormSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        className="form-control"
                        value={username}
                        onChange={event => setExercise({ ...exercise, username: event.target.value })}>
                        {
                            users.map(function (user) {
                                return <option
                                    key={user._id}
                                    value={user.username}>{user.username}
                                </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={event => setExercise({ ...exercise, description: event.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={event => setExercise({ ...exercise, duration: Number(event.target.value) })}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <DatePicker
                        selected={date}
                        onChange={date => setExercise({ ...exercise, date: date })}
                    />
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default EditExercise;