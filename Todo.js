class Todo {
    constructor(el) {
        this.listElement = document.querySelector(el.element);
        this.btnElement = document.querySelector(el.btn);
        this.messageElement = document.querySelector(el.message);
        this.message = []
        this.list = []
    }
    add(data) {
        this.list.push(data.list);
        this.addMessage(data.message)
        this.updateView();
        this.setStorage();
    }
    addMessage(message) {
        this.message.push(message);
        this.updateMessage();
    }
    setStorage() {
        localStorage.setItem('list', JSON.stringify(this.list));
    }
    getStorage() {
        const list = localStorage.getItem('list');
        if (list != null) {
            this.list = JSON.parse(list);
            return this.list;
        } else {
            return false;
        }
    }
    updateCheck(id) {
        const newArr = this.list.findIndex(e => {
            return e.id == id;
        });
        this.list[newArr].check = true;
        this.setStorage()
        this.updateView();
    }
    delete(id) {
        const newArr = this.list.filter(e => {
            return e.id != id;
        });
        this.list = newArr;
        this.setStorage()
        this.updateView();
    }
    updateView() {
        this.listElement.innerHTML = this.list.map((list) => {
            return this.templateList(list)
        }).join('');
        if (!this.btnCheck) {
            this.btnCheck = document.querySelectorAll('[data-check]');
            this.btnTrash = document.querySelectorAll('[data-trash]');
            handlerCheckAndTrash();
        }
    }
    updateMessage() {
        this.messageElement.innerHTML = this.message.map((list) => {
            return this.templateMessage(list)
        }).join('');
        setTimeout(() => {
            this.messageElement.innerHTML = ''
        }, 5000);

    }
    templateMessage(data) {
        return `
            <div class="message ${data.type}">
                <h2>${data.title}</h2>
                <p>${data.text}</p>
            </div>
        `;
    }
    templateList(data) {
        return `
            <li class="${data.prior}">
                <small>${data.deadline}</small>
                <h2>${data.title}</h2>
                <p>${data.desc}</p>
                <div class="button">
                    <button data-id="${data.id}" data-check>&check;</button>
                    <button data-id="${data.id}" data-trash>&times;</button>
                </div>
            </li>
        `;
    }

}