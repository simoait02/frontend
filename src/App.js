import React, { Component } from 'react';
import "./App.css"
import {Link} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div >
                <section>
                    <div className="color"></div>
                    <div className="color"></div>
                    <div className="color"></div>
                    <div className="box">
                        <div className="Container" style={{justifyContent:"space-evenly"}}>
                            <div className="title">
                                <h2 style={{textAlign:"center"}}>Projet Conteneurisation Des Applications</h2>
                            </div>                            <div className="addEtudiant" >
                                <Link to="/add-student" className="button">
                                    <h2>Ajouter un étudiant</h2>
                                </Link>
                            </div>
                            <div className="listerEtudiant">
                                <Link to="/list-student" className="button">
                                    <h2>Lister tous les étudiants</h2>
                                </Link>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default App;