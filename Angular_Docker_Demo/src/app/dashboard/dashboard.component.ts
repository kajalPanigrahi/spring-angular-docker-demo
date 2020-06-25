import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';
import { MatDialog } from '@angular/material';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { DeleteNoteViewComponent } from '../delete-note-view/delete-note-view.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  note : Note;
  notesList : Array<Note>;
  errorMessage : string;
  constructor(private noteService : NoteService,
              private dialog: MatDialog) { 
    this.note = new Note();
    this.notesList = [];
  }

  ngOnInit() {
    this.noteService.getNotes().subscribe(res =>{
      console.log('res', res);
      
      this.notesList = res;
    }, error =>{
      this.errorMessage = error.message;
    })
  }

  addNote(){
    this.notesList.push(this.note);
    this.noteService.addNote(this.note).subscribe(res =>{
      this.note = new Note();
    },
    error =>{
      console.log('error after response',error);
      if(error.status === 409){
        this. errorMessage = "Note with id :" + this.note.id + " is already exists";
      }
      else{
        this.errorMessage = "Some internal error occured... Try Again"
      }
      this.notesList.pop();
    })
  }

  editNote(note : Note){
      this.dialog.open(EditNoteViewComponent,{
        data : note
      }).afterClosed().subscribe(res =>{
        console.log("After edit dialog closed", res);
        let updatedNote = res['data'];
        let foundNote = this.notesList.find(note => note.id === updatedNote.id);
        Object.assign(foundNote,updatedNote);
      })

    
  }
  deleteNote(noteToBeDeleted : Note){
    this.dialog.open(DeleteNoteViewComponent,{
      data : noteToBeDeleted
    }).afterClosed().subscribe(res =>{
      console.log("After delete dialog closed", res);
      if(res){
      let deleteNoteIndex = this.notesList.findIndex(note => note.id === noteToBeDeleted.id);
      this.notesList.splice(deleteNoteIndex,1);
      }
    })
  }

}
