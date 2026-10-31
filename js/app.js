document.addEventListener('DOMContentLoaded', () => {

  let ToDoForm = document.getElementById('todo-form');
  let ToDoInput = document.getElementById('todo-input');
  let AddButton = document.getElementById('add-btn');
  let ErrorMsg = document.getElementById('error-msg');
  let FilterAll = document.getElementById('filter-all');
  let FilterActive = document.getElementById('filter-active');
  let FilterDone = document.getElementById('filter-done');
  let ToDoList = document.getElementById('todo-list');
  let Counter = document.getElementById('counter');


  let currentFilter = 'all';

  function updateCounter() {
    let items = ToDoList.querySelectorAll('li');
    let activeCount = 0;

    for (let item of items) {
      if (item.classList.contains('completed') == false) {
        activeCount = activeCount + 1;
      }
    }

    if (activeCount == 1) {
      Counter.textContent = activeCount + " item left";
    } else {
      Counter.textContent = activeCount + " items left";
    }
  }


  function applyFilter() {
    let items = ToDoList.querySelectorAll('li');

    for (let item of items) {
      let isCompleted = item.classList.contains('completed');

      if (currentFilter == 'all') {
        item.style.display = 'flex';
      }
      else if (currentFilter == 'active') {
        if (isCompleted) {
          item.style.display = 'none';
        } else {
          item.style.display = 'flex';
        }
      }
      else if (currentFilter == 'done') {
        if (isCompleted) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      }
    }
  }


  ToDoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let taskText = ToDoInput.value.trim();

    if (taskText == '') {
      ErrorMsg.classList.remove('hidden');
      return;
    }

    ErrorMsg.classList.add('hidden');

    let li = document.createElement('li');

    let span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = taskText;

    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(deleteBtn);
    ToDoList.appendChild(li);

    ToDoInput.value = '';

    applyFilter();
    updateCounter();
  });


  ToDoList.addEventListener('click', (event) => {
    let target = event.target;

    if (target.tagName == 'SPAN') {
      let parentLi = target.parentNode;
      parentLi.classList.toggle('completed');

      applyFilter();
      updateCounter();
    }

    if (target.tagName == 'BUTTON') {
      let parentLi = target.parentNode;
      parentLi.remove();

      applyFilter();
      updateCounter();
    }
  });



  FilterAll.addEventListener('click', () => {
    currentFilter = 'all';
    applyFilter();
  });

  FilterActive.addEventListener('click', () => {
    currentFilter = 'active';
    applyFilter();
  });

  FilterDone.addEventListener('click', () => {
    currentFilter = 'done';
    applyFilter();
  });
});

// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here