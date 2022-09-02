import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper {
  
  //new datatype for note object
  public type Note = {
    title: Text;
    content: Text;
  };

  stable var notes: List.List<Note> = List.nil<Note>();

  public func createNote(titleText: Text, contentText: Text){
    var newNote: Note = {
      title = titleText;
      content = contentText;
    };

    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes));
  };

  public query func readNotes(): async [Note]{
    return List.toArray(notes); 
  };

  public func deleteNote(id: Nat){
    var noteArr1 = List.take(notes, id);
    var noteArr2 = List.drop(notes, id+1);
    notes := List.append(noteArr1, noteArr2);
  };
}