import React, { useEffect } from "react";
import './CharacteristicsPopUp.css'

const CharacteristicsPopUp = (props) => {

    {/* Autre truc: */}
    {/* On ne peut pas faire de série dégressive, genre 10 puis 8 puis 6 */}
    {/* Meme probleme avec le poids */}
    {/* SOLUTION: les infos sup, ex: poids baisse de 2 a chaque fois */}
    {/* Solution pas optimale */}
    
    function saveCharacteristics() {
        const newCharacteristics = [
            document.getElementById('nmbRep').value,
            document.getElementById('nmbSet').value,
            document.getElementById('nmbWeight').value,
            document.getElementById('conSpeed').value,
            document.getElementById('exSpeed').value,
            document.getElementById('infoSup').value,
        ];
        props.updateCharacteristics(newCharacteristics);
    }

    // useEffect(() => {
    //     console.log("Les caractéristiques: ", props.characteristics);
    // }, [props.characteristics])

    return (
        <div id="characteristicsPopUp">
            <header>
                <button onClick={props.characteristicsPopUp}>×</button>
            </header>
            {/* phase excentrique concentrique */}
            {/* la vitesse */}
            {/* Nombre de reps */}
            {/* Nombre de sets */}
            <main> {/* Pour le nettoyage réflechir si c'est worth de faire un component ↓ */}
                <input type="number" name="nmbReps" id="nmbRep" placeholder="Nombre de Repétitions" min={1}/>
                <input type="number" name="nmbSets" id="nmbSet" placeholder="Nombre de Set" min={1}/>
                <input type="number" name="weight" id="nmbWeight" placeholder="Charge de travail" min={0}/>
                {/* Pareil on pourrait expliquer la diff entre reps et sets */}
                <div id="phasesSpeed"> {/* phase concentrique (contraction) */}
                    <section>
                        <h1>Phase Concentrique</h1> {/* On pourrait ajouter une aide pour explique ce que c'est */}
                        <select name="vitesse" id="conSpeed">
                            <option value="" disabled selected hidden>Choisir la vitesse</option>
                            <option value="lent">Lent</option>
                            <option value="normal">Normal</option>
                            <option value="explosif">Explosif</option>
                        </select>
                    </section>
                    <section> {/* Voir si on peu mettre une default value qui serait "normal" */}
                    <h1>Phase Excentrique</h1> {/* On pourrait ajouter une aide pour explique ce que c'est */}
                        <select name="vitesse" id="exSpeed">
                            <option value="" disabled selected hidden>Choisir la vitesse</option>
                            <option value="lent">Lent</option>
                            <option value="normal">Normal</option>
                            <option value="explosif">Explosif</option>
                        </select>
                    </section>             
                </div>
                <input type="text" id="infoSup" placeholder="Infos Supplémentaire"/>
            </main>
            <footer>
                <button onClick={() => { props.characteristicsPopUp(); saveCharacteristics() }}>Sauvegarder les caractéristiques</button>
            </footer>
        </div>
    )
}

export default CharacteristicsPopUp;