import React, { useState } from 'react';
import axios from 'axios';

const NewUser = () => {
  const [username, setUsername] = useState('');
  return (  
    <div>
      <h1>Add New User</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        const user = {
          username: username
        }

        axios.post('http://localhost:5000/users/add', user)
          .then(res => {
            console.log(res.data)
          })
          .catch(err => {
            console.log(`Error: ${err}`);
          })

        setUsername('');
      }}>
        <div className="form-group mt-5">
          <label>Username: </label>
          <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <input type="submit" value="Add User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
 
export default NewUser;