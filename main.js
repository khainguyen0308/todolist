

const formAdd = document.querySelector('#addForm');
const inputAdd = formAdd.querySelector('#addInput');

let items = [];

formAdd.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputAdd.value) {
        addItem(inputAdd.value);
        inputAdd.value = '';
    } 
    else {
        alert('Please enter the todo!!!!!!');
    }
})

function addItem(value) {
    const newItem = {
        id: Date.now(),
        label: value,
        isDone: false,
        isEdit: false
    }

    // Add item vừa tạo vào mảng
    items.push(newItem);
    // Render giao diện
    renderItems();
}

// Hàm render
function renderItems() {
    const todoListNode = document.querySelector('.todos');
    todoListNode.innerHTML = '';

    items.forEach((item) => {
        // item's keys
        const { id, label, isDone, isEdit } = item;

        // todos__item
        const itemElement = document.createElement('li');
        itemElement.id = id;
        itemElement.className = `todos__item ${isDone ? 'todos__item-done' : ''}`;
        
        // label
        const labelElement = document.createElement('span');
        labelElement.className = 'todos-label';
        labelElement.innerText = label;

        // actions wrap 3 btn
        const actionsElement = document.createElement('div');
        actionsElement.className = 'todos-action';

        // btn delete
        const btnDelete = document.createElement('button');
        btnDelete.className = 'btn btn-red';
        btnDelete.innerText = 'Delete';
        // handle btn delete
        btnDelete.addEventListener('click', (e) => {
            e.preventDefault();
            deleteItemById(id);
        })

        // btn edit
        const btnEdit = document.createElement('button');
        btnEdit.className = 'btn btn-yellow';
        btnEdit.innerText = 'Edit';
        // handle btn Edit
        btnEdit.addEventListener('click', (e) => {
            e.preventDefault();
            toggleEditViewById(id);
        })
                
        // btn done
        const btnDone = document.createElement('button');
        btnDone.className = `btn ${ !isDone ? 'btn-green' : 'btn-yellow' }`;
        btnDone.innerText = `${!isDone ? 'Done' : 'Undone'}`;
        // handle btn Done
        btnDone.addEventListener('click', (e) => {
            e.preventDefault();
            // Update status btn done
            updateStatusById(id);
        })

        // btn Save
        const btnSave = document.createElement('button');
        btnSave.className = 'btn btn-blue';
        btnSave.innerText = 'Save';

        // edit Form & Input
        const inputEdit = document.createElement('input');
        inputEdit.className = 'input inputEdit';
        inputEdit.value = label;

        const formEdit = document.createElement('form');
        formEdit.className = 'form editForm';
        formEdit.addEventListener('submit', (e) => {
            e.preventDefault();
            if (inputEdit.value) {
                updateLabelById(id, inputEdit.value);
                toggleEditViewById(id);
                inputEdit.value = '';
            }
        })

        // Render HTML
        if (isEdit) {
            formEdit.appendChild(inputEdit);
            formEdit.appendChild(btnSave);
            itemElement.appendChild(formEdit); //li
        } else {
            actionsElement.appendChild(btnDelete);
            !isDone && actionsElement.appendChild(btnEdit);
            actionsElement.appendChild(btnDone);

            itemElement.appendChild(labelElement);
            itemElement.appendChild(actionsElement);
        }
        // add li to ul
        todoListNode.appendChild(itemElement);
    })
}


/*--- FUNCTIONS ---*/
// handle delete by id 
function deleteItemById(id) {
    // Lấy lại item bỏ vào items trừ item giống id
    items = items.filter(item => item.id !== id);
    renderItems();
}

// handle update status done
function updateStatusById(id) {
    // Nếu cùng id thì sẽ cập nhật lại trạng thái
    items = items.map((item) =>
        item.id === id ? {...item, isDone: !item.isDone} : item
    );
    renderItems();
}

// handle toggle view
function toggleEditViewById(id) {
    // Nếu cùng id thì sẽ cập nhật lại trạng thái
    items = items.map((item) =>
        item.id === id ? { ...item, isEdit: !item.isEdit } : item
    );
    renderItems();
}

// handle update label
function updateLabelById(id, valueUpdate) {
    items = items.map((item) =>
        item.id === id ? { ...item, label: valueUpdate} : item
    );
  renderItems();
}