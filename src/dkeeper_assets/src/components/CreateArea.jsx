import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Collapse } from "@mui/material";

function CreateArea(props){
    const [note, setNote] = useState({
        title:"",
        content:""
    });

    const [isCollapsed, setCollapsed] = React.useState(false);

    function handleChange(event){
        let {name, value} = event.target;
        setNote((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function submitNote(event){
        event.preventDefault();
        props.addNote(note)
        setNote({title:"", content:""})
    }

    const handleCollapse = () => {
        setCollapsed(true);
    };
    
    return(
        <div>
            <form className="create-note" autoComplete="off">
                {isCollapsed && (<input 
                    name="title" 
                    placeholder="Title" 
                    onChange={handleChange} 
                    value={note.title}>
                </input>) }
                
                <input 
                    name="content" 
                    placeholder="Take a note..." 
                    rows={isCollapsed ? 3 : null} 
                    onChange={handleChange} 
                    onClick={handleCollapse} 
                    value={note.content}>
                </input>
                <Collapse in={isCollapsed}>
                    <Fab onClick={submitNote}>
                            <AddIcon />
                    </Fab>
                </Collapse>
            </form>
        </div>
    );
}

export default CreateArea;