import React, { useState, useEffect } from 'react';

import './Home.css'

import CharacteristicsPopUp from './components/CharacteristicsPopUp';
import FiltersPopUp from './components/FiltersPopUp'; 

export default function Home({exercisesSaved, setExercisesSaved}) {

  const [apiResponse, setApiResponse] = useState([]);
  const [filters, setFilters] = useState([]); 
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [characteristics, setCharacterisitcs] = useState([]);
  // const [exercisesSaved, setExercisesSaved] = useState([]);
  
  useEffect(() => {
    // Effect to fetch data when the component mounts
    fetch("https://sportwebapp-data.onrender.com/exercise")
      .then((res) => res.json())
      .then((exercise) => {
        console.log('It in fetch là');
        console.log('montre les exercices qui arrivent: ', exercise);
        setApiResponse(exercise); // Update the state with the fetched data
      })
      .catch((err) => console.error('cest lerreur', err)); // Handle errors
  }, []);

  function filtersPopUp() {
    var filtersPopUpDiv = document.getElementById('filtersPopUp');
    filtersPopUpDiv.classList.toggle('open');
  }

  function characteristicsPopUp() {
    var characteristicsPopUpDiv = document.getElementById('characteristicsPopUp');
    characteristicsPopUpDiv.classList.toggle('open');
  }

  function updateFilters(newFilters) {
    setFilters(newFilters);
  }
  
  useEffect(() => {
    console.log(filters);
    apiResponse.map((exercise) => {console.log(exercise)});
    console.log(filters);
    if (filters.length == 0) {
      const filteredExercises = apiResponse
      .map((exercise) => (
        <option key={exercise.name} value={exercise.name}>
          {exercise.name}
        </option>
      ));
      setFilteredExercises(filteredExercises);
    } else {
      const filteredExercises = apiResponse
        .filter((exercise) => {
          return (
            (filters[0] === false || 
              exercise.unilateral === filters[0]) && 
            (filters[1] === false || 
              exercise.bilateral === filters[1]) &&
            (filters[2] === '' || 
              exercise.bodyPart === filters[2]) &&
            (filters[3] === '' || 
              exercise.mainMuscles.includes(filters[3]))
          );
        })
        .map((exercise) => (
          <option key={exercise.name} value={exercise.name}>
            {exercise.name}
          </option>
        ));

      // Update the state with the filtered exercises
      setFilteredExercises(filteredExercises);
    }
  }, [apiResponse, filters]);

  function filteredExercisesFunc(apiResponse, filters) {
    if (filters.length == 0) {
      var filteredExercisesList = apiResponse;
      return filteredExercisesList;
    } else {
      var test = [{name: "cest le test"}];
      return test;
    }
  }

  function updateCharacteristics(newCharacteristics) {
    setCharacterisitcs(newCharacteristics);
    console.log("Les caractéristiques: ", newCharacteristics)
  };


  // Il doit regarder quel exercise est choisit et ses caractéristique
  // → vérifier l'exercice
  // → vérifier les caractéristique

  // Quand choosenExercise n'a pas été choisis c'est choosenExercise == '' → true
  // Pour check characteristics faut faire characteristics.length == 0 (comme ligne 42)
  function addExercise() {
    var choosenExercise = document.getElementById('exercisesList').value;
    if (choosenExercise == '' && characteristics.length == 0) {
      alert('Il faut choisir un exercice et définir ses caractéristiques avant d\'ajouter l\'exercice');
    } else if (choosenExercise !== '' && characteristics.length == 0) {
      alert('Faut ajouter les caractéristiques');
    } else if (choosenExercise == '' && characteristics.length !== 0) {
      alert('Faut ajouter un exercice');
    } else {
      // Ajouter vérification
      // Est ce qu'il y a des vitesses définit pour les 2 phases (si c'est normal est ce qu'il faut l'afficher ?)
      // Est ce qu'il y a des infos supplémentaire, si non alors ne pas mettre ", Infos Supplémentaire: "
      setExercisesSaved((list) => [...list, 
        "<p>" + 
        choosenExercise + 
        ", Nombre de répétitions: " + 
        characteristics[0] + 
        ", Nombre de Sets: " + 
        characteristics[1] + 
        ", Charge de travail: " + 
        characteristics[2] + 
        (characteristics[3] !== '' ? ", Vitesse phase concentrique: " + characteristics[3] : '') +
        (characteristics[4] !== '' ? ", Vitesse phase excentrique: " + characteristics[4] : '') +
        (characteristics[5] !== '' ? ", Infos Supplémentaire: " + characteristics[5] : '') +
        "</p>"
      ]);
    }
  };

  useEffect(() => {
    document.getElementById('exercisesSaved').innerHTML = exercisesSaved.join(', ').replace(/,/g, '');
  }, [exercisesSaved])

  return (
<div className="App">
        <div id="exerciseListDiv">
          <label htmlFor="exercisesList" id="labelExList">Liste des exercices:</label>
          <select name="exercisesList" id="exercisesList">
            <option value="" disabled selected hidden>Choisir des exercices</option>
              {filteredExercises}
          </select>
        </div>
        <div id="filters" class="divs" onClick={() => filtersPopUp()}>
            <p>Filters</p>
        </div>        
        <FiltersPopUp 
          filtersPopUp={filtersPopUp} 
          filters={filters} 
          updateFilters={updateFilters}
        />
        <div id="characteristics" class="divs" onClick={() => characteristicsPopUp()}>
          <p>Caractéristique</p>
        </div>
        <CharacteristicsPopUp 
          characteristicsPopUp={characteristicsPopUp} 
          characteristics={characteristics} 
          updateCharacteristics={updateCharacteristics}
        />
        <div id="addExercise" class="divs" onClick={addExercise}>Ajouter l'exercice avec ces caractéristiques</div>
        <div id="exercisesSaved" class="divs"></div>
        <div id="start" class="divs"><a href="#/training">Commmencer l'entrainement</a></div>
    </div>
  );
}