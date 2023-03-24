package com.reactexact.backend.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.reactexact.backend.models.TaskModel;
import com.reactexact.backend.services.TaskService;

@RestController
@RequestMapping("/task")
public class TaskController {
	@Autowired
	TaskService taskService;
	
	@GetMapping()
	public ArrayList<TaskModel> findTasks(){
		return taskService.findTask();
	}
	
	@PostMapping()
	public TaskModel saveTask(@RequestBody TaskModel task) {
		return this.taskService.saveTask(task);
	}
	
	@GetMapping(path = "/{id}")
	public Optional<TaskModel> findTaskById(@PathVariable("id") Integer id){
		return this.taskService.findId(id);
	}
	
	@GetMapping(path = "/query")
	public ArrayList<TaskModel> findTaskByState(@RequestParam("state") String state){
		return taskService.findState(state);
	}
	
	@DeleteMapping(path="/{id}")
	public String deleteById(@PathVariable("id") Integer id) {
		boolean ok=this.taskService.deleteTask(id);
		if(ok) {
			return "Se eliminó el usuario con id "+id;	
		}else {
			return "No se pudo eliminar el usuario con id "+id;
		}
	}
	
	
}
