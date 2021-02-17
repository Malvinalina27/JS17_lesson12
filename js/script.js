'use strict';

const todoControl = document.querySelector('.todo-control'), //форма
      headerInput = document.querySelector('.header-input'), //из инпута извлекаем значение
      todoList  = document.querySelector('.todo-list'),//сюда добавляем дела
      todoCompleted = document.querySelector('.todo-completed');//выполненные дела

let todoData = [];

//добавление дел на страницу(рендерит)
const render = function() { 
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item, i){
    const li = document.createElement('li');
  
    li.classList.add('todo-item');
   
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
      '</div>';
    
    

    //выполненные и невыполненные дела
    if (item.completed) { 
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    //отмечает выполненные дела
    const btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function() {
      item.completed = !item.completed;
      localStorage.setItem('todo', JSON.stringify(todoData));
      render();
    });

    //удаление дела
    const btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click', function() { 
      todoData.splice(i, 1);
      localStorage.setItem('todo', JSON.stringify(todoData));
      render();
    });
    

  });
 
};

if (localStorage.getItem('todo')) {
  todoData = JSON.parse(localStorage.getItem('todo'));
  render();
} 

todoControl.addEventListener('submit', function(event){
  event.preventDefault(); 
  
  const newToDo = { 
    value: headerInput.value,
    completed: false
  };

  if (headerInput.value !== '' && headerInput.value.trim() && headerInput.value !== null) {
    todoData.push(newToDo);
  }

  headerInput.value = '';  
  
  localStorage.setItem('todo', JSON.stringify(todoData));
  render();
});


render();