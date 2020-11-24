
let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add');
//наш инпут присваем message;bи определяем кнопку;

//весь список элементов <li> наш класс todo
let todo = document.querySelector('.todo');

let todoList = [];

if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}


//на кнопку вешаем метод отслеживания клика и запуска функции;
addButton.addEventListener('click', function(){
//проверяем вводится ли текст из инпута
//console.log(addMessage.value);

        if(!addMessage.value) return;
        let newTodo = {
            todo: addMessage.value,
            checked: false,
            important:false
            };

        todoList.push(newTodo);
    //console.log(newTodo);
    //console.log(todoList);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});
// addMessage.value = '';очищаем поле ввода

function displayMessages(){
    let displayMessage = '';
    if(todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function(item, i){
displayMessage += `
<li>
  <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
  <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
</li>
`;
todo.innerHTML = displayMessage;
    });
}

todo.addEventListener('change', function(e){
    let idInput = e.target.getAttribute('id');
    let forLabel = todo.querySelector('[for='+ idInput +']');
    let valueLabel = forLabel.innerHTML;
    
    todoList.forEach(function(item){
        if (item.todo === valueLabel){
        item.checked = !item.checked;
        localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});
//внутри фигурных скобок для проверки console.log(e.target.getAttribute('id'));
//получаем атрибут айди, индекс галочки (item_1 или 0, на какой кликнули) из массива гагалочек;
//затем выбираем наш <label> с нашим айди(item_?);console.log('valueLabel: ', valueLabel);
//затем выводим текст нашего лейбл, сохраняем в локал сторидж 

//делаем правой кнопкой мыши свое контекст меню
todo.addEventListener('contextmenu', function(e){
    e.preventDefault();
    todoList.forEach(function(item, i){
        if(item.todo === e.target.innerHTML){
            if(e.ctrlKey || e.metaKey){
                todoList.splice(i, 1);
            }else{
            item.important = !item.important;}
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});



