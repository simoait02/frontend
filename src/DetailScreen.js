import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Column from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const DetailScreen = () => {
    const { idEtudiant } = useParams(); // Get idEtudiant from URL
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotes(idEtudiant);
    }, [idEtudiant]);

    const fetchNotes = async (idEtudiant) => {
        try {
            const response = await fetch(`http://localhost:8080/Notes/${idEtudiant}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
            setError("Failed to fetch notes");
        }
    };

    return (
        <div>
            <section>
                <div className="color"></div>
                <div className="color"></div>
                <div className="color"></div>
                <div className="box">
                    <Column
                        className="Container"
                        style={{ height: "700px", width: "1000px", overflowY: "auto", padding: "10px" }}
                    >
                        <div className="myRow">
                            <div className="title">
                                <h2>Liste Des Notes</h2>
                            </div>
                            <Link to={`/add-note/${idEtudiant}`} style={{textDecoration: 'none'}}>
                                <Button className="addButton">
                                    Ajouter une note
                                </Button>
                            </Link>
                        </div>

                        {error && <p style={{color: "red"}}>{error}</p>}
                        <div className="table-container" >
                            <table className="table" >
                                <thead>
                                <tr>
                                    <th>Nom d'étudiant</th>
                                    <th>Nom de matière</th>
                                    <th>Note</th>
                                </tr>
                                </thead>
                                <tbody>
                                {notes.length > 0 ? (
                                    notes.map((note) => (
                                        <tr key={note.idNote} style={note.value>=10?{ backgroundColor: "green"}:{backgroundColor:"red"}}>
                                            <td style={{color:"white"}}>{note.etudiant.name}</td>
                                            <td style={{color:"white"}}>{note.name}</td>
                                            <td style={{color:"white"}}>{note.value}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: "center" }}>
                                            Aucune Note trouvée
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </Column>
                </div>
            </section>
        </div>
    );
};

export default DetailScreen;
