import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {

   note : Note;
   updatedNote : Note;
  constructor(
    public dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note ,
    public noteService : NoteService) { 
      this.note = Object.assign({},data);
    }

  ngOnInit() {
  }
  editNote(){
    this.noteService.editNote(this.note).subscribe(res =>{
      this.updatedNote = res;
      console.log('updated Note', this.updatedNote);
      this.dialogRef.close({data:this.updatedNote});
      
    }, error =>{
      console.log('error ', error);
      
    })
  }
}
