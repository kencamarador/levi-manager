import React, { useState } from 'react';


//Set State variables
const TextArea = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault(); //prevent page from reloading

  // set values for data
  const data = {  
    id: id,
    name: name,
    date: date,
    time: time
  };
 //fetch api from api gateway aws
  const response = await fetch('https://yj3v95rmlk.execute-api.ca-central-1.amazonaws.com/items', {
    method: 'PUT',
    body: JSON.stringify(data), //lambda accepts json so this cannot be formdata
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const json = await response.json();
//clear values in fields if response is good.
  if (response.ok) {
    setId('');
    setName('');
    setDate('');
    setTime('');
  }
}

  return (
    <form onSubmit={handleSubmit}>
    <label>
    Did you feed Levi?
    <select value={id} onChange={(e) => setId(e.target.value)}>
        <option value="">Select one</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
    </select>
    </label>

      <br />
    <label>
    Who are you?
    <select value={name} onChange={(e) => setName(e.target.value)}>
        <option value="">Select one</option>
        <option value="Ken">Ken</option>
        <option value="Karmela">Karmela</option>
    </select>
    </label>
      <label>
        Date
        <input type="Date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <label>
        Time
        <input type="Time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default TextArea;
