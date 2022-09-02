import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import { dkeeper } from "../../../declarations/dkeeper" ;
//import notes from "../notes";
import CreateArea from "./CreateArea";

function App(){
    const [notes, setNotes] = useState([]);
    
    function addNote(newNote){
        setNotes((prevNotes) => {
            dkeeper.createNote(newNote.title, newNote.content);
            return [newNote, ...prevNotes]
        });
    }

    useEffect(()=>{
        console.log("useEffect is called!");
        fetchData();
    }, []); 

    async function fetchData(){
        const notesArray = await dkeeper.readNotes();
        setNotes(notesArray);
    }

    function deleteNote(id){
        dkeeper.deleteNote(id); 
        setNotes((prevNotes) =>{
            return (
                prevNotes.filter((note, index) => {
                    return index !== id;
                })
            );
        });
    }

    return(
        <div>
            <Header />
            <CreateArea 
                addNote = {addNote}
            />
            {notes.map((note, index) => (
                <Note
                    key = {index}
                    id = {index}
                    title = {note.title}
                    content = {note.content}
                    onDelete = {deleteNote}
                />
            ))}
            <Footer />
        </div>
    );
}

export default App;