import ReactDOM from 'react-dom/client'; // Use `react-dom/client` for React 18+
import App from './App';
import AddStudent from "./AddStudent";
import DetailStudents from "./DetailScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListStudents from "./ListStudents";
import AddNote from "./AddNote";

export default function AppRouter() { // Renamed to start with a capital letter
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/list-student" element={<ListStudents />} />
                <Route path="/note-etudiant/:idEtudiant" element={<DetailStudents />} />
                <Route path="/add-note/:idEtudiant" element={<AddNote />} />
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppRouter />);
