package com.todoapp.repository;

import com.todoapp.entity.Task;
import com.todoapp.entity.TaskStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByStatusOrderByCreatedAtDesc(TaskStatus status);

    List<Task> findAllByOrderByCreatedAtDesc();
}