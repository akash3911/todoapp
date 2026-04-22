const apiBase = '/api/tasks';

const taskForm = document.getElementById('taskForm');
const taskIdInput = document.getElementById('taskId');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const statusInput = document.getElementById('status');
const taskList = document.getElementById('taskList');
const filterStatus = document.getElementById('filterStatus');
const resetButton = document.getElementById('resetButton');

async function loadTasks() {
    const selectedStatus = filterStatus.value;
    const url = selectedStatus ? `${apiBase}?status=${selectedStatus}` : apiBase;
    const response = await fetch(url);
    const tasks = await response.json();
    renderTasks(tasks);
}

function renderTasks(tasks) {
    if (!tasks.length) {
        taskList.innerHTML = '<p class="empty-state">No tasks found.</p>';
        return;
    }

    taskList.innerHTML = tasks.map(task => `
        <article class="task-card">
            <div class="task-top">
                <div>
                    <h3 class="task-title">${escapeHtml(task.title)}</h3>
                    <p class="task-description">${escapeHtml(task.description || 'No description added')}</p>
                </div>
                <span class="badge ${statusClass(task.status)}">${formatStatus(task.status)}</span>
            </div>
            <div class="task-actions">
                <button type="button" class="secondary" onclick='editTask(${JSON.stringify(task)})'>Edit</button>
                <button type="button" class="danger" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        </article>
    `).join('');
}

async function saveTask(event) {
    event.preventDefault();

    const task = {
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        status: statusInput.value,
    };

    const method = taskIdInput.value ? 'PUT' : 'POST';
    const url = taskIdInput.value ? `${apiBase}/${taskIdInput.value}` : apiBase;

    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Something went wrong');
        return;
    }

    resetForm();
    await loadTasks();
}

function editTask(task) {
    taskIdInput.value = task.id;
    titleInput.value = task.title;
    descriptionInput.value = task.description || '';
    statusInput.value = task.status;
    titleInput.focus();
}

async function deleteTask(id) {
    const confirmed = confirm('Delete this task?');
    if (!confirmed) {
        return;
    }

    await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
    await loadTasks();
}

function resetForm() {
    taskForm.reset();
    taskIdInput.value = '';
    statusInput.value = 'PENDING';
}

function formatStatus(status) {
    return status.replace('_', ' ');
}

function statusClass(status) {
    return status.toLowerCase();
}

function escapeHtml(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

taskForm.addEventListener('submit', saveTask);
filterStatus.addEventListener('change', loadTasks);
resetButton.addEventListener('click', resetForm);

loadTasks();