let todos = [];
const ulElement = document.getElementsByTagName('ul')[0];
const btnSubmit = document.getElementById('btnSubmit');
const countRow = document.getElementById('countRow');



const templateTodos = (data) => `
<div class="w3-row w3-border w3-large">
  <div class="w3-col" style="width: 60px;">
    <img src="./tumb/tumb-${data.tumb}.jpg" alt="tumb-1" style="width: 60px;">
  </div>
  <div class="w3-rest w3-padding-small">
    <div class="w3-tiny w3-text-gray">${data.timeLocal}</div>
    <div class="w3">${data.text}</div>
    <div class="w3-bar">
      <button class="w3-button w3-bar-item w3-right w3-red" id="btnTrash" data-id="${data.id}">&times;</button>
      <button class="w3-button w3-bar-item w3-right w3-green" id="btnCheck" data-id="${data.id}">&check;</button>
    </div>
  </div>
</div>
`;

const addTodos = (data) => {
  todos.push(data);
  setLocalStorage();
  updateView(data)
}

const deleteTodos = (id) => {
  todos = todos.filter(todo => todo.id != id);
  setLocalStorage();
  updateCountRow();
}

const checkTodos = (id) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      todos[i].check = true;
      todos[i].time = Date.now();
    }
  }
  setLocalStorage();
  updateCountRow();
}

const updateView = (data) => {
  data.tumb = Math.floor(Math.random() * 10 + 1);
  data.timeLocal = dateLocal(data.time);
  let item = createElementItem(data);
  ulElement.prepend(item);
  updateCountRow();
  setAction();
}

const updateCountRow = () => {
  countRow.innerText = ulElement.children.length;
}

const setLocalStorage = () => {
  console.warn('Saving "my-todos"');
  localStorage.setItem('my-todos', JSON.stringify(todos));
}

const getLocalStorage = () => {
  const data = localStorage.getItem('my-todos');
  if (data != '[]') {
    console.warn('Getting "my-todos"');
    todos = JSON.parse(data);
    todos.forEach(todo => {
      updateView(todo);
    })
  }
}



const setAction = () => {
  const btnCheck = document.querySelectorAll('#btnCheck');
  const btnTrash = document.querySelectorAll('#btnTrash');
  let num1 = 0;
  btnTrash.forEach(btn => {
    if (num1 == 0) {
      num1 = num1 + 1
      btn.addEventListener('click', (e) => {
        const kata = "Are you sure deleting ?";
        if (confirm(kata)) {
          console.log('sudah menghapus');
          deleteElementItem(e.path[2]);
          deleteTodos(e.target.dataset.id);
        }
      });
    }
  });
  let num2 = 0;
  btnCheck.forEach(btn => {
    if (num2 == 0) {
      num2 = num2 + 1
      btn.addEventListener('click', (e) => {
        console.log('sudah selesaikan');
        checkElementItem(e.path[2]);
        checkTodos(e.target.dataset.id);
      });
    }
  });


}

const createElementItem = (data) => {
  const li = document.createElement('li');
  let check;
  if (data.check) check = 'done';
  li.setAttribute('class', 'w3-border-0 w3-animate-zoom ' + check);
  li.innerHTML = templateTodos(data);
  return li;
}

const deleteElementItem = (elem) => {
  elem.parentNode.removeChild(elem);
}

const checkElementItem = (elem) => {
  console.log(elem);
  elem.classList.add('done');
}


const getNewIdTodos = () => {
  if (todos.length == 0) {
    return 1;
  } else {
    let max = 0;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id > max) max = todos[i].id;
    }
    return max + 1;
  }
}

const onSubmitForm = (e) => {
  const id = getNewIdTodos();
  const text = e.target.form['in_text'].value;
  if (text == "") return console.error('Tulis dengan benar');
  const time = Date.now();
  const check = false;
  let data = { id, text, time, check }
  addTodos(data);
  e.target.form.reset();
}



btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  onSubmitForm(e);
});


getLocalStorage();

function dateLocal(date) {
  const bulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
  const d = new Date(date);
  const tgl = d.getDate();
  const bln = d.getMonth();
  const thn = d.getFullYear();
  const jam = d.getHours();
  const mnt = d.getMinutes();
  return `${toTwoDigit(tgl)} ${bulan[bln]} ${thn}, ${toTwoDigit(jam)}:${toTwoDigit(mnt)}`;

}

function toTwoDigit(n) {
  const res = (n < 10) ? ('0' + n) : n;
  return res;
}