package com.reactexact.backend.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reactexact.backend.models.TaskModel;
import com.reactexact.backend.repositories.TaskRepository;

@Service
public class TaskService {
	@Autowired
	TaskRepository taskRepository;
	
	public ArrayList<TaskModel> findTask(){
		return (ArrayList<TaskModel>) taskRepository.findAll();
	}
	
	public TaskModel saveTask(TaskModel task) {
		return taskRepository.save(task);
	}
	
	public Optional<TaskModel> findId(Integer id) {
		return taskRepository.findById(id);
	}
	
	public ArrayList<TaskModel> findState(String state){
		return taskRepository.findByState(state);
	}
	
	public boolean deleteTask(Integer id) {
		try {
			taskRepository.deleteById(id);
			return true;
		}catch (Exception e) {
			return false;
		}
	}
	
	
}
