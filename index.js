const todo = new Todo({
    element: 'ul#list',
    message: '#message',
    btn: '#btnAdd'
});

let cekStorage = todo.getStorage();
if (!cekStorage) {
    todo.addMessage({
        type: 'warning',
        title: 'Warning !!!',
        text: 'Not found data of list todo :('
    })
} else {
    todo.updateView()
}

todo.btnElement.addEventListener('click', (e) => {
    todo.formElement = document.forms['form'];
    todo.formElement.style.display = 'block';
    todo.formElement.addEventListener('submit', submitForm);
    e.target.style.display = 'none';
    document.querySelector('#btnClose').addEventListener('click', () => {
        todo.formElement.style.display = 'none';
        e.target.style.display = 'block';
    });
});

function submitForm(e) {
    e.preventDefault();
    todo.btnElement.style.display = 'block';
    e.target.style.display = 'none';

    let newId = 0;
    if (todo.list) {
        newId = todo.list.length + 1
    } else {
        newId = 1;
    }

    const data = {
        list: {
            id: newId,
            title: e.target.elements.title.value,
            desc: e.target.elements.desc.value,
            cat: e.target.elements.cat.value,
            prior: e.target.elements.prior.value,
            deadline: e.target.elements.deadline.value,
            check: false
        },
        message: {
            type: 'success',
            title: 'Success !!!',
            text: 'Successfully in adding new todo. :)'
        }
    }
    todo.add(data);
}

function handlerCheckAndTrash() {
    todo.btnCheck.forEach(el => {
        el.addEventListener('click', (e) => {
            todo.updateCheck(e.target.attributes['data-id'].value);
        });
    });
    todo.btnTrash.forEach(el => {
        el.addEventListener('click', (e) => {
            todo.delete(e.target.attributes['data-id'].value);
        });
    });
}