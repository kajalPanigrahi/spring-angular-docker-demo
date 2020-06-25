import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-delete-note-view',
  templateUrl: './delete-note-view.component.html',
  styleUrls: ['./delete-note-view.component.css']
})
export class DeleteNoteViewComponent implements OnInit {

  noteToBeDeleted : Note;
  constructor(public dialogRef: MatDialogRef<DeleteNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note ,
    public noteService : NoteService) { 
      this.noteToBeDeleted = data;
    }

  ngOnInit() {
  }
  closeDialog(){
    this.dialogRef.close();
  }
  deleteNote(){
    this.noteService.deleteNote(this.noteToBeDeleted).subscribe(res =>{
      console.log('Result after delete success', res);
      if(res){
        this.dialogRef.close(this.noteToBeDeleted);
      }
  
    }, error =>{
      console.log('error ', error);
      
      this.dialogRef.close();
      
    })
  }
}
