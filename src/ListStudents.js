import React, { Component } from "react";
import Column from "react-bootstrap/Col";
import { IconButton } from "rsuite";
import SearchDataLiveIcon from "@rsuite/icons/SearchDataLive";
import { Link } from "react-router-dom";

class ListStudents extends Component {
    constructor() {
        super();
        this.state = {
            students: [],
            studentsWithMoyenne: [],
            error: null,
        };
    }

    componentDidMount() {
        this.fetchStudents();
    }

    fetchStudents = async () => {
        try {
            const response = await fetch("http://127.0.0.1:7000/Etudiants", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            const studentsWithMoyenne = await Promise.all(
                data.content.map(async (student) => {
                    const moyenne = await this.fetchMoyenne(student.idEtudiant);
                    return { ...student, moyenne };
                })
            );

            this.setState({ studentsWithMoyenne });
        } catch (error) {
            console.error("Error fetching students:", error);
            this.setState({ error: "Failed to fetch students" });
        }
    };

    fetchMoyenne = async (idEtudiant) => {
        try {
            const response = await fetch(`http://127.0.0.1:7000/Notes/${idEtudiant}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const notes = await response.json();

            // Return null if no notes are found
            if (notes.length === 0) return null;

            const total = notes.reduce((sum, note) => sum + note.value, 0);
            return total / notes.length;
        } catch (error) {
            console.error(`Error fetching notes for student ${idEtudiant}:`, error);
            return null; // Return null on error
        }
    };

    render() {
        const { studentsWithMoyenne, error } = this.state;
        return (
            <div>
                <section>
                    <div className="color"></div>
                    <div className="color"></div>
                    <div className="color"></div>
                    <div className="box">
                        <Column className="Container" style={{ height: "700px", width: "1000px" }}>
                            <div className="title">
                                <h2>Liste Des Etudiants</h2>
                            </div>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <div className="table-container">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nom complet</th>
                                        <th>Date de création</th>
                                        <th>Moyenne</th>
                                        <th>Détail</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {studentsWithMoyenne.length > 0 ? (
                                        studentsWithMoyenne.map((student, index) => (
                                            <tr
                                                key={index}
                                                style={{
                                                    backgroundColor:
                                                        student.moyenne === null
                                                            ? "inherit"
                                                            : student.moyenne >= 10
                                                                ? "green"
                                                                : "red",
                                                    color:
                                                        student.moyenne === null
                                                            ? "inherit"
                                                            : "white",
                                                }}
                                            >
                                                <td>{student.idEtudiant}</td>
                                                <td>{student.name}</td>
                                                <td>{student.creationDate}</td>
                                                <td>{student.moyenne?.toFixed(2) || "N/A"}</td>
                                                <td style={{ padding: "0px" }}>
                                                    <Link
                                                        to={{
                                                            pathname: `/note-etudiant/${student.idEtudiant}`,
                                                            state: { idEtudiant: student.idEtudiant },
                                                        }}
                                                    >
                                                        <IconButton
                                                            appearance="primary"
                                                            icon={<SearchDataLiveIcon />}
                                                            circle
                                                            size="sm"
                                                            className="detailButton"
                                                        >
                                                            Détail
                                                        </IconButton>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: "center" }}>
                                                Aucun étudiant trouvé
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
    }
}

export default ListStudents;
