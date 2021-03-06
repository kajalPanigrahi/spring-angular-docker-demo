package com.stackroute.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.springboot.domain.Note;
import com.stackroute.springboot.exception.NoteAlreadyExistsException;
import com.stackroute.springboot.exception.NoteNotFoundException;
import com.stackroute.springboot.service.NoteService;

@RestController //@Controller @ResponseBody
@CrossOrigin(origins = "http://192.168.99.100:8083")
@RequestMapping("api/v1")
public class NoteController {
	
	private NoteService noteService;
	private ResponseEntity<?> responseEntity;
	
	
	@Autowired
	public NoteController(NoteService noteService) {		
		this.noteService = noteService;
	}
	
	//api/v1/employees -- POST -- BODY {JSON}
	//api/v1/employees -- GET  -- 
	//api/v1/employees/{id} -- GET 
	//api/v1/employees/{id} -- DELETE


	@PostMapping("/notes")
	public ResponseEntity<?> saveNoteToDB(@RequestBody Note note) throws NoteAlreadyExistsException{
		System.out.println("inside SaveEmployeeToDB");
		try {
			Note createdNote = noteService.saveNote(note);
			responseEntity = new ResponseEntity<>(createdNote, HttpStatus.CREATED);
			
		} catch (NoteAlreadyExistsException e) {
			throw new NoteAlreadyExistsException();
		}
		
		return responseEntity;
	}
	
	@GetMapping("/notes")
	public ResponseEntity<?> getNotes() {
		try {
		responseEntity= new ResponseEntity<>(	noteService.getNotes() , HttpStatus.OK);
		} catch (Exception e) {
		responseEntity = new ResponseEntity<>("Some internal error occured...", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return responseEntity;
	}
	
	@GetMapping("/notes/{id}")
	public ResponseEntity<?> getEmployeeById(@PathVariable String id) throws NoteNotFoundException{
		try {
			Note note = noteService.getNoteById(id);
			responseEntity = new ResponseEntity<>(note,HttpStatus.OK);
		} catch (NoteNotFoundException e) {
			e.printStackTrace();
			throw e;
		}catch(Exception e) {
			responseEntity = new ResponseEntity<>("Some internal error occured...", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return responseEntity;
	}
	
	@PutMapping("/notes")
	public ResponseEntity<?> updateEmployee(@RequestBody Note note) throws NoteNotFoundException{
		try {
		Note updatedNote = 	noteService.updateNote(note);
		responseEntity = new ResponseEntity<>(updatedNote,HttpStatus.OK);
		} catch (NoteNotFoundException e) {
			throw e;
		} catch(Exception e) {
			responseEntity = new ResponseEntity<>("Some internal error occured...", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return responseEntity;
	}
	
	@DeleteMapping("notes/{id}")
	public ResponseEntity<?> deleteEmployee(@PathVariable String id) throws NoteNotFoundException{
		try {
		boolean status = noteService.deleteNote(id);
		if(status)
			responseEntity = new ResponseEntity<>("Note is deleted successfully", HttpStatus.OK);
		else
			responseEntity = new ResponseEntity<>("Some Internal Error Occurred..", HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (NoteNotFoundException e) {
			throw e;
		}
		
		return responseEntity;
	}

	
	
	
	
	
}
