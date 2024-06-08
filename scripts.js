// scripts.js

document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', manageTask);

function addTask(e) {
    e.preventDefault();
    const taskText = taskInput.value;
    if (taskText === '') return;

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;

    taskList.appendChild(taskItem);
    saveTask(taskText);

    taskInput.value = '';
}

function manageTask(e) {
    if (e.target.classList.contains('delete')) {
        const taskItem = e.target.parentElement.parentElement;
        removeTask(taskItem);
        taskItem.remove();
    } else if (e.target.classList.contains('edit')) {
        const taskItem = e.target.parentElement.parentElement;
        const taskText = taskItem.querySelector('span').innerText;
        taskInput.value = taskText;
        removeTask(taskItem);
        taskItem.remove();
    } else {
        const taskItem = e.target.parentElement;
        taskItem.classList.toggle('completed');
        updateTaskStatus(taskItem);
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: task, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskItem) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskItem.querySelector('span').innerText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskList.appendChild(taskItem);
    });
}

function updateTaskStatus(taskItem) {
    const taskText = taskItem.querySelector('span').innerText;
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = taskItem.classList.contains('completed');
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
