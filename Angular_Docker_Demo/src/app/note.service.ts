import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnInit{

  private NOTES_BACKEND_API_URL : string = "http://192.168.99.100:8083/api/v1/notes";

  

  constructor(private http: HttpClient) { }

  ngOnInit(){

  }

  getNotes() : Observable<Array<Note>>{
    return this.http.get<Array<Note>>(this.NOTES_BACKEND_API_URL);
  }

  addNote(note: Note) : Observable<Note>{
    return this.http.post<Note>(this.NOTES_BACKEND_API_URL,note);
  }
  editNote(note : Note) : Observable<Note>{
    console.log('inside edit', note);
    
    return this.http.put<Note>(this.NOTES_BACKEND_API_URL,note);
  }

  deleteNote(note:Note){
    return this.http.delete(`${this.NOTES_BACKEND_API_URL}/${note.id}`,{
      responseType:"text"
    });
  }

  
  
}
