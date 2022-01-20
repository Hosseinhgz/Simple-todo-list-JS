// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');



// Event listener
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);


// Functions
function addTodo(event){
  // Prevent form from submitting and refreshing the page
  event.preventDefault();

  // create todo <div> with class of "todo"
  const todoDiv = document.createElement('div')
  todoDiv.classList.add("todo")

  // create a new todo inside the recently created div
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);


  // Add todo to local storage
  saveLocalTodos(todoInput.value);
  // check mark button
  const completedButton = document.createElement('button')
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton)

  // check trash button
  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton)

  // Append whole todoDiv to actual place in main index.html
  todoList.appendChild(todoDiv);

  // clear todo INPUT VALUE
  todoInput.value="";
}

function deleteCheck(e){
  // for check where you click
  //console.log(e.target);
  const item = e.target;
  // Delete todo
  if (item.classList[0]==="trash-btn"){
    const todo = item.parentElement;

    // add animation
    todo.classList.add('fall');
    removeLocalTodos(todo)
    todo.addEventListener('transitionend', function(){
      todo.remove();
    })
  }

  if (item.classList[0]==="complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }

}

function saveLocalTodos(todo){
  // check do I have already have sth in there
  let todos;
  if(localStorage.getItem('todos')=== null){
    todos=[];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  };
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodos(){
  let todos;
  if(localStorage.getItem('todos')=== null){
    todos=[];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  };
  todos.forEach(function (todo) {
      // create todo <div> with class of "todo"
  const todoDiv = document.createElement('div')
  todoDiv.classList.add("todo")

  // create a new todo inside the recently created div
  const newTodo = document.createElement('li');
  newTodo.innerText = todo;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // check mark button
  const completedButton = document.createElement('button')
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton)

  // check trash button
  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton)

  // Append whole todoDiv to actual place in main index.html
  todoList.appendChild(todoDiv);

  });

}

function removeLocalTodos(todo){
  // Check
  let todos;
  if(localStorage.getItem('todos')=== null){
    todos=[];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem('todos', JSON.stringify(todos))
}