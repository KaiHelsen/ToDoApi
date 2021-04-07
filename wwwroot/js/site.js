const uri = 'api/Games';
let todos = [];

//try to get items from the database
function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

//try to add a new item to the database
function addItem() {
    const addNameTextbox = document.getElementById('add-title');

    const item = {
        isComplete: false,
        title: addNameTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

//try to delete item
function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-title').value = item.title;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-publisher').value = item.publisher;
    document.getElementById('edit-developer').value = item.developer;
    document.getElementById('edit-engine').value = item.engine;
    document.getElementById('edit-isComplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';
}

//try to update an existing item
function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        title: document.getElementById('edit-title').value.trim(),
        publisher: document.getElementById('edit-publisher').value.trim(),
        developer: document.getElementById('edit-developer').value.trim(),
        engine: document.getElementById('edit-engine').value.trim(),
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

//display counter text
function _displayCount(itemCount) {
    const title = (itemCount === 1) ? 'game' : 'games';

    document.getElementById('counter').innerText = `${itemCount} ${title}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('class', 'btn btn-primary')
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('class', 'btn btn-danger')
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);

        let td2 = tr.insertCell(1);
        let titleNode = document.createTextNode(item.title);
        td2.appendChild(titleNode);
        
        let td3 = tr.insertCell(2);
        let publisherNode = document.createTextNode(item.publisher);
        td3.appendChild(publisherNode);
        
        let td4 = tr.insertCell(3);
        let developerNode = document.createTextNode(item.developer);
        td4.appendChild(developerNode);
        
        let td5 = tr.insertCell(4);
        let engineNode = document.createTextNode(item.engine);
        td5.appendChild(engineNode);

        let td6 = tr.insertCell(5);
        td6.appendChild(editButton);

        let td7 = tr.insertCell(6);
        td7.appendChild(deleteButton);
    });

    todos = data;
}