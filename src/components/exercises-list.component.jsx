import React, { useState, useEffect } from "react";
import axios from 'axios';
import Exercise from "./exercise.component";

const Action = {
    update: "update",
    delete: "delete"
}

function ExercisesList() {

    const [exercises, setExercises] = useState([]);
    const [action, setAction] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/exercises/')
            .then(res => {
                if (res.data.length > 0) {
                    setExercises(res.data);
                }
            })
            .catch(err => console.log(err));
    }, [action]);

    function deleteExerciseById (id) {
        axios.delete(`http://localhost:3000/exercises/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        setAction(Action.delete);
    }

    return (
        <div>
            <h3>Exercises List</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map(exercise => <Exercise key={exercise._id} exercise={exercise} onDeleteCb={deleteExerciseById}/>)}
                </tbody>
            </table>
        </div>
    );
}

export default ExercisesList;