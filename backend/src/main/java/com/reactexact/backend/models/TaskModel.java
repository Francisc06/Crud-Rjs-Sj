package com.reactexact.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name="Task")
public class TaskModel {

    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(unique=true,nullable=false)
	private Integer id;
    private String task;
    private String state;

    public void setId(Integer id) {
        this.id=id;
    }

    public void setTask(String task) {
        this.task=task;
    }

    public void setState(String state) {
        this.state=state;
    }

    public Integer getId() {
        return id;
    }

    public String getTask() {
        return task;
    }

    public String getState() {
        return state;
    }




}