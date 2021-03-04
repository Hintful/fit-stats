/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const deleteWorkout = (id) => {
  axios.delete(`http://localhost:5000/workouts/${id}`)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })

  window.location = '/';
}

const WorkoutsList = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/workouts')
      .then(res => {
        setWorkouts(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  return (
    <div>
      <h3>Workouts Log</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Title</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map(workout => (
            <tr>
              <td>{workout.username}</td>
              <td>{workout.title}</td>
              <td>{workout.duration}</td>
              <td>{workout.date.substring(0, 10)}</td>
              <td>
                <div class="d-flex gap-2">
                  <Link to={`/edit/${workout._id}`}>
                    <button className="btn btn-outline-primary btn-sm">Edit</button>
                  </Link>
                  &nbsp;
                  <button className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      deleteWorkout(workout._id)
                    }}
                  >Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkoutsList;