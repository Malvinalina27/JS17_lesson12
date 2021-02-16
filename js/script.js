'use strict';

const todoControl = document.querySelector('.todo-control'), //форма
      headerInput = document.querySelector('.header-input'), //из инпута извлекаем значение
      todoList  = document.querySelector('.todo-list'),//сюда добавляем дела
      todoCompleted = document.querySelector('.todo-completed');//выполненные дела

const todoData = [];

//добавление дел на страницу(рендерит)
const render = function() { 
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item){
    const li = document.createElement('li');
  
    li.classList.add('todo-item');
   
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' + 
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
      '</div>';
    
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    //отмечает выполненные дела
    const btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function() {
      item.completed = !item.completed;
      render();
    });

    //удаление дела
    const btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click', function() {    
      li.remove(); 
    });


  });
};

todoControl.addEventListener('submit', function(event){
  event.preventDefault(); //не перезагружается страница при нажатиии на +
  //происходит событие submit
  const newToDo = { //новый объект
    value: headerInput.value,
    completed: false
  };
  
  todoData.push(newToDo);
  //вызываем рендер для обновления списка дел
  render();
});

render();