import React, { Component } from "react";
import Col from "react-bootstrap/Col"; // Ensure correct import
import Button from "react-bootstrap/Button";

class AddStudent extends Component {
    constructor() {
        super();
        this.state = {
            studentName: "",
            error: null,
        };
    }

    // Function to handle form submission
    handleAddStudent = async () => {
        const { studentName } = this.state;

        if (studentName.trim()) {
            try {
                const newStudent = await this.addStudent(studentName);
                alert(`Student ${newStudent.name} added successfully!`);
                this.setState({ studentName: "", error: null }); // Reset input field
            } catch (error) {
                this.setState({ error: "Failed to add student. Please try again later." });
            }
        } else {
            alert("Veuillez entrer un nom.");
        }
    };

    // API call to add a student
    addStudent = async (name) => {
        try {
            const response = await fetch("http://localhost:8080/Etudiants", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error adding student:", error);
            throw error;
        }
    };

    // Handle input changes
    handleInputChange = (event) => {
        this.setState({ studentName: event.target.value });
    };

    render() {
        const { studentName, error } = this.state;

        return (
            <div>
                <section>
                    <div className="color"></div>
                    <div className="color"></div>
                    <div className="color"></div>
                    <div className="box">
                        <Col className="Container" style={{justifyContent:"space-evenly"}}>
                            <div className="title">
                                <h2>Ajouter Un Etudiant</h2>
                            </div>
                            <div className="name">
                                <input
                                    name="studentName"
                                    value={studentName}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    placeholder="Entrer le nom complet de l'étudiant"
                                    className="input"
                                />
                            </div>
                            <Button
                                onClick={this.handleAddStudent}
                                className="button"
                                style={{ marginTop: "100px" }}
                            >
                                <h2>Ajouter</h2>
                            </Button>
                            {error && <p className="error">{error}</p>}
                        </Col>
                    </div>
                </section>
            </div>
        );
    }
}

export default AddStudent;
