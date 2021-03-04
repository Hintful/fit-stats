import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const NewWorkout = () => {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users/')
      .then(res => {
        if (res.data.length > 0) {
          setUsers(res.data.map(user => user.username));
          setUsername(res.data[0].username);
        }
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
  }, []);

  return (
    <div>
      <h1>Add a new workout</h1>
      <form onSubmit={(e) => {
        e.preventDefault();

        const workout = {
          username: username,
          title: title,
          duration: duration,
          date: date,
        }
        console.log(workout);
        axios.post('http://localhost:5000/workouts/add', workout)
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
          <input type="submit" value="Add Workout" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default NewWorkout;