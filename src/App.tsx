import React from 'react';
import './App.css';
import CheckboxList from './components/CheckboxList';
import Graph from './components/Graph';
import Title from './components/Title';

function App(): JSX.Element  {
  return (
    <div className='App'>
      <div className='main-container'>
        <Title/>
        <CheckboxList/>
        <Graph/>
      </div>
    </div>
  );
}

export default App;
