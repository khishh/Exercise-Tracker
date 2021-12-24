import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise() {

    const [formState, setFormState] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    });

    useEffect(() => {
        axios.get('http://localhost:3000/users/')
            .then(res => {
                console.log(res.data);
                if(res.data.length > 0) {
                    setFormState({...formState, users: res.data, username: res.data[0].username});
                }
            })
            .catch(err => console.log(err));
    }, []);

    const { username, description, duration, date, users } = formState;
    console.log(formState);

    const onExerciseFormSubmit = event => {
        event.preventDefault();
        console.log(username);
        const newExercise = { 
            username: username, description: description, duration: duration, date: date };

        axios.post('http://localhost:3000/exercises/add', newExercise)
            .then(res => console.log(res));

        console.log(newExercise);
        window.location = '/';
    }

    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={onExerciseFormSubmit}>
                <div className="form-group">
                    <label>UserName: </label>
                    <select required className="form-control" value={username} onChange={(event) => setFormState({ ...formState, username: event.target.value })}>
                        {
                            users.map(user => <option key={user._id} value={user.username}>{user.username}</option>)
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text" required className="form-control" value={description} onChange={event => setFormState({ ...formState, description: event.target.value })} />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={event => setFormState({ ...formState, duration: Number(event.target.value) })}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={date => setFormState({ ...formState, date: date })}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}

export default CreateExercise;