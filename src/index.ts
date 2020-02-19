const addButton = document.getElementById('addButton') as HTMLInputElement;
const itemToAdd = document.getElementById('itemToAdd') as HTMLInputElement;
let items: ShoppingItem[] = [];
const list = document.getElementById('list') as HTMLUListElement;
const count = document.getElementById('count') as HTMLSpanElement;

const storedItems = localStorage.getItem('shopping-list');

if (storedItems) {
    items = JSON.parse(storedItems);
    items.forEach(createItemInDom);
    shoppingListCount();
}

addButton.addEventListener('click', addTheItem);

// to be able to save on "enter" as well as click
// tslint:disable-next-line: only-arrow-functions
itemToAdd.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
        addTheItem();
    }
});

interface ShoppingItem {
    description: string;
}

function addTheItem() {
    const item = itemToAdd.value;
    const thingToAdd: ShoppingItem = { description: item };
    items = [...items, thingToAdd];
    createItemInDom(thingToAdd);
    itemToAdd.value = ''; // clear it out!
    itemToAdd.focus();  // put the cursor there ready for the next item.
    saveIt();
    shoppingListCount();
}

function createItemInDom(item: ShoppingItem) {
    const li = document.createElement('li') as HTMLLIElement;
    li.classList.add('list-group-item');
    const text = document.createTextNode(item.description);
    li.appendChild(text);
    list.insertBefore(li, list.firstChild);
}
// <li class="list-group-item">Cras justo odio</li>

function saveIt() {
    localStorage.setItem('shopping-list', JSON.stringify(items));
}

function shoppingListCount() {
    count.innerText = items.length.toString();
}
