document.addEventListener('DOMContentLoaded', () => {
  
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const errorMsg = document.getElementById('error-msg');
  const todoList = document.getElementById('todo-list');
  const counter = document.getElementById('counter');
  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterDone = document.getElementById('filter-done');

  
  let currentFilter = 'all'; 
  
  function updateCounter() {
    const activeCount = todoList.querySelectorAll('li:not(.completed)').length;
    
    
    let pluralSuffix = (activeCount === 1) ? '' : 's';
    counter.textContent = activeCount + ' item' + pluralSuffix + ' left';
  }

 
  function applyFilter() {
    const items = todoList.querySelectorAll('li');
    items.forEach(item => {
      const isCompleted = item.classList.contains('completed');
      if (currentFilter === 'all') {
        item.classList.remove('hidden');
      } else if (currentFilter === 'active') {
        item.classList.toggle('hidden', isCompleted);
      } else if (currentFilter === 'done') {
        item.classList.toggle('hidden', !isCompleted);
      }
    });
  }

  
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = todoInput.value.trim();

    if (taskText === '') {
      errorMsg.classList.remove('hidden');
      return;
    }

    
    errorMsg.classList.add('hidden');

    
    const li = document.createElement('li');
    
    const textSpan = document.createElement('span');
    textSpan.className = 'item-text';
    textSpan.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Delete';

    
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    
    todoInput.value = '';

    
    applyFilter();
    updateCounter();
  });

  
  todoList.addEventListener('click', (e) => {
    const target = e.target;

    
    if (target.classList.contains('item-text')) {
      const parentLi = target.closest('li');
      parentLi.classList.toggle('completed');
      applyFilter();
      updateCounter();
    }

    
    if (target.classList.contains('delete-btn')) {
      const parentLi = target.closest('li');
      parentLi.remove();
      updateCounter();
    }
  });

  
  filterAll.addEventListener('click', () => {
    currentFilter = 'all';
    applyFilter();
  });

  filterActive.addEventListener('click', () => {
    currentFilter = 'active';
    applyFilter();
  });

  filterDone.addEventListener('click', () => {
    currentFilter = 'done';
    applyFilter();
  });

  updateCounter();
});

// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
