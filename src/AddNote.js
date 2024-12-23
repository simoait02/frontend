import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const AddNote = () => {
    const { idEtudiant } = useParams();
    const [note, setNote] = useState({
        name: "",
        value: 0,
        etudiantId: idEtudiant,
    });
    const [error, setError] = useState(null);

    const handleAddNote = async () => {
        const { name, value, etudiantId } = note;

        if (name.trim() && value !== null) {
            try {
                const newNote = await addNote(name, value, etudiantId);
                alert(`Note for ${newNote.name} added successfully!`);
                setNote({ name: "", value: 0, etudiantId: idEtudiant });
                setError(null);
            } catch (error) {
                setError("Failed to add note. Please try again later.");
            }
        } else {
            alert("Please fill in all fields.");
        }
    };

    const addNote = async (name, value, etudiantId) => {
        try {
            const response = await fetch("http://127.0.0.1:7000/Notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    etudiant: { idEtudiant: etudiantId },
                    name: name,
                    value: value,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error adding note:", error);
            throw error;
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === "value") {
            const sanitizedValue = Math.max(0, Math.min(20, value));
            setNote({
                ...note,
                [name]: sanitizedValue,
            });
        } else {
            setNote({
                ...note,
                [name]: value,
            });
        }
    };

    return (
        <div>
            <section>
                <div className="color"></div>
                <div className="color"></div>
                <div className="color"></div>
                <div className="box">
                    <Col className="Container">
                        <div className="title">
                            <h2>Ajouter Une Note</h2>
                        </div>
                        <div className="input-group">
                            <input
                                name="name"
                                value={note.name}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Entrer le nom de la matière"
                                className="input"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                name="value"
                                value={note.value}
                                onChange={handleInputChange}
                                type="number"
                                placeholder="Entrer la note"
                                className="input"
                                min="0"
                                max="20"
                            />
                        </div>
                        <Button
                            onClick={handleAddNote}
                            className="button"
                            style={{ marginTop: "20px" }}
                        >
                            Ajouter
                        </Button>
                        {error && <p className="error">{error}</p>}
                    </Col>
                </div>
            </section>
        </div>
    );
};

export default AddNote;
