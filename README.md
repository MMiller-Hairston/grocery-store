# grocery

Store objects are responsible for holding state and providing actions to mutate that state. You can have as many store objects as you need to keep them simple and responsible for a small part of your app state. Grocery is a library to help facilitate that process.

## install

> npm install

## usage

```js
const store = createStore();

// Add an array named 'collection' to the store.
const collection = store.createCart('collection');

// Add an item to the array
collection.addItem(item);

// Update an item in the array
collection.updateItem(id, item);

// Remove an item in the array
collection.removeItem(id);

// Return array to default value
collection.clearCart();

// Get current value of cart
collection.getCart();

// Add an object named 'item' to the store.
const item = store.createItem('item');

// Update value of item
item.updateItem(item);

// Return item to default state
item.clearItem();

// Get current value of item
item.getItem();
```
