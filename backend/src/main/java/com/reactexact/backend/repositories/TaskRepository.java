package com.reactexact.backend.repositories;

import java.util.ArrayList;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.reactexact.backend.models.TaskModel;

@Repository
public interface TaskRepository extends CrudRepository<TaskModel, Integer>{
	public abstract ArrayList<TaskModel> findByState(String state);
}
