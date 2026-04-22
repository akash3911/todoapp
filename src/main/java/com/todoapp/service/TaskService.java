package com.todoapp.service;

import com.todoapp.entity.Task;
import com.todoapp.entity.TaskStatus;
import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final com.todoapp.repository.TaskRepository taskRepository;

    public List<Task> getAllTasks(TaskStatus status) {
        return status == null
                ? taskRepository.findAllByOrderByCreatedAtDesc()
                : taskRepository.findByStatusOrderByCreatedAtDesc(status);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    public Task createTask(Task task) {
        task.setId(null);
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task task) {
        Task existingTask = taskRepository.findById(id).orElse(null);
        if (existingTask == null) {
            return null;
        }

        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setStatus(task.getStatus());
        return taskRepository.save(existingTask);
    }

    public boolean deleteTask(Long id) {
        Task existingTask = taskRepository.findById(id).orElse(null);
        if (existingTask == null) {
            return false;
        }

        taskRepository.delete(existingTask);
        return true;
    }
}