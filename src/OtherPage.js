import React from "react";

function OtherPage({exercisesSaved}) {

    var testExercises = localStorage.getItem("exercises");

    return (
        <div id="otherPage">
            <h1>Hello new page</h1>
            <p>{testExercises.length}</p>
        </div>
    )
}

export default OtherPage;