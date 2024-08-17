import React, { useState } from 'react';
import './index.css';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showTasks, setShowTasks] = useState(false);

  const calcBmi = (event) => {
    event.preventDefault();

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    // Check if weight and height are valid
    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      alert('Enter valid weight and height');
      return;
    }

    // Convert height from cm to meters
    const heightInMeters = heightNum / 100;
    
    // Calculate BMI
    const bmiValue = (weightNum / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    // Set the message based on BMI
    let message = '';

    if (bmiValue < 18.5) {
      message = 'You are underweight';
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      message = 'You are a healthy weight';
    } else {
      message = 'You are overweight';
    }

    setMessage(message);

    // Add task to the list
    setTasks([...tasks, { name, age, weight: weightNum, height: heightNum, bmi: bmiValue, message }]);

    // Clear the fields
    setName('');
    setAge('');
    setWeight('');
    setHeight('');
  };

  const reload = () => {
    window.location.reload();
  };

  const toggleTasks = () => {
    setShowTasks(!showTasks);
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="0"
            />
          </div>
          <div>
            <label>Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              step="0.1"
              min="0"
            />
          </div>
          <div>
            <label>Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              step="0.1"
              min="0"
            />
          </div>
          <div>
            <button className="btn" type="submit">Calculate</button>
            <button className="btn btn-outline" onClick={reload} type="button">Clear</button>
            <button className="btn btn-outline" onClick={toggleTasks} type="button">
              {showTasks ? 'Hide Task Manager' : 'Show Task Manager'} </button>
          </div>
        </form>

        <div className="center">
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>


        {showTasks && (
          <div className="task-manager">
            <h3 className="center">Task Manager</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Weight (kg)</th>
                  <th>Height (cm)</th>
                  <th>BMI</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.name}</td>
                    <td>{task.age}</td>
                    <td>{task.weight}</td>
                    <td>{task.height}</td>
                    <td>{task.bmi}</td>
                    <td>{task.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
