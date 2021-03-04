import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import WorkoutsList from './components/WorkoutsList';
import EditWorkout from './components/EditWorkout';
import NewWorkout from './components/NewWorkout';
import NewUser from './components/NewUser';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path='/' exact component={WorkoutsList} />
        <Route path='/edit/:id' component={EditWorkout} />
        <Route path='/new' component={NewWorkout} />
        <Route path='/user' component={NewUser} />
      </div>
    </Router>
  );
}

export default App;
