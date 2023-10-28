import React, { useState, useEffect, useRef } from 'react';

const FiltersPopUp = (props) => {
    
    
    function saveFilters() {
        const newFilters = [
          document.getElementById('unilateralRadio').checked,
          document.getElementById('bilateralRadio').checked,
          document.getElementById('bodyPartsSelect').value,
          document.getElementById('mainMusclesSelect').value
        ];
        props.updateFilters(newFilters); // Call the updateFilters function from props
      }
      
    // useEffect(() => {
    //     console.log(filters);
    // }, [filters]);

    return (
        <div id="filtersPopUp">
            <header>
                <button onClick={props.filtersPopUp}>×</button>
            </header>
            <main>
                {/* Unilateral / Bilateral */}
                <div>
                    <input type="checkbox" name="type" id="unilateralRadio" value="unilateral" />
                    <label htmlFor="unilateral">unilateral</label>
                    <br/>
                    <input type="checkbox" name="type" id="bilateralRadio" value="bilateral"/>
                    <label htmlFor="bilateral">bilateral</label>
                </div>
                {/* Body Part */}
                <div>
                    <select name="bodyParts" id="bodyPartsSelect">
                        <option value="" disabled selected hidden>Choisir la partie du corps</option>
                        <option value="Dos">Dos</option>
                        <option value="Épaules">Épaules</option>
                        <option value="Bras">Bras</option>
                        <option value="Abdos">Ceinture Abdominales</option>
                        <option value="Jambes">Jambes/Fessiers</option>
                    </select>
                {/* Main Muslces */}
                {/* Faut que ca soit update en fonction du body part choisis juste avant (si c'est chosit) */}
                {/* c'est le dernier filtre si vraiment on veut chercher un exercice pour une zone spécifique, */}
                {/* donc ca sera une liste dans l'ordre alphabetique */}
                {/* (pour éviter de devoir faire un truc de recherche) */}
                    <select name="mainMuscles" id="mainMusclesSelect">
                        <option value="" disabled selected hidden>Choisir un muscles spécifique</option>
                        <option value="Biceps">Biceps</option>
                        <option value="Brachial">Brachial</option>
                        <option value="Deltoïdes antérieurs">Deltoïdes antérieurs</option>
                        <option value="Triceps">Triceps</option>
                    </select>
                </div>
                <footer>
                    {/* ajouter une autre fonction qui save les filtres */}
                    <button onClick={() => { props.filtersPopUp(); saveFilters(); }}>Valider les filtres</button>
                </footer>
            </main>
        </div>
    );
};

export default FiltersPopUp;