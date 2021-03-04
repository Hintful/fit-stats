import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';

const EditWorkout = (props) => {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/workouts/${id}`)
    .then(res => {
      setUsername(res.data.username);
      setTitle(res.data.title);
      setDuration(res.data.duration);
      setDate(new Date(res.data.date))
    })
    .catch(err => {
      console.log(err);
    })

    axios.get('http://localhost:5000/users/')
      .then(res => {
        if (res.data.length > 0) {
          setUsers(res.data.map(user => user.username));
        }
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
  }, []);

  return (
    <div>
      <h1>Edit workout</h1>
      <form onSubmit={(e) => {
        e.preventDefault();

        const workout = {
          username: username,
          title: title,
          duration: duration,
          date: date,
        }
        console.log(workout);
        axios.post(`http://localhost:5000/workouts/update/${id}`, workout)
          .then(res => {
            console.log(res.data)
          })
          .catch(err => {
            console.log(`Error: ${err}`);
          })

        setUsername('');
        setTitle('');
        setDuration(0);

        window.location = '/';
      }}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}>
            {users.map(user => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>

          <label className="mt-3">Workout title: </label>
          <input required type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />

          <label className="mt-3">Duration: </label>
          <input required type="text" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} />

          <label className="mt-3">Date: </label>
          <DatePicker selected={date} onChange={date => setDate(date)} />
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Workout" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}
 
export default EditWorkout;