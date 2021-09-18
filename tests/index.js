const test = require('tape');

const createStore = require('../src/index');

test('grocery: store', function (t) {
  const store = createStore();

  t.deepEqual(store.getStore(), {}, 'store has a default value');
  store.createCart('collection', 'id');
  t.assert(
    'collection' in store.getStore(),
    'collection is available in the store'
  );
  t.end();
});

test('grocery: cart errors', function (t) {
  const store = createStore();

  t.throws(
    store.createCart,
    /Name is required for cart to be a part of the store/,
    'name is required for a cart'
  );
  const tests = store.createCart('tests');
  t.throws(
    () => store.createCart('tests'),
    /Name should be unique/,
    'name throws when not unique'
  );

  t.throws(
    () => tests.updateItem('3', {}),
    /An element with that identifier was not found/,
    'item must exist to be updated'
  );
  t.throws(
    () => tests.removeItem('3'),
    /An element with that identifier was not found/,
    'item must exist to be removed'
  );

  tests.addItem({ id: '1' });
  t.throws(
    () => tests.addItem({ id: '1' }),
    /An element with that identifier is already in the cart, you should update it instead/,
    'cannot add duplicates'
  );

  t.throws(
    store.createItem,
    /Name is required for cart to be a part of the store/,
    'an item name is required'
  );

  const second = store.createItem('second');
  t.throws(
    () => store.createItem('second'),
    /Name should be unique/,
    'cannot add duplicates'
  );

  second.updateItem({ id: '1' });
  t.deepEqual(
    store.getStore().second,
    { id: '1' },
    'item was updated in store'
  );
  t.deepEqual(second.getItem(), { id: '1' }, 'item was updated');

  second.clearItem();
  t.deepEqual(second.getItem(), {}, 'item was cleared');
  t.end();
});

test('grocery: cart methods', function (t) {
  const store = createStore();
  const items = store.createCart('items', 'id');

  const first = { id: '1', name: 'first' };
  const second = { id: '2', name: 'second' };

  items.addItem(first);
  t.deepEqual(store.getStore().items, [first], 'item is available in store');
  t.deepEqual(items.getCart(), [first], 'item is available in cart');

  const edited = { id: '1', name: 'edited' };
  items.updateItem('1', { name: 'edited' });
  t.deepEqual(store.getStore().items, [edited], 'item is edited in store');
  t.deepEqual(items.getCart(), [edited], 'item is edited in cart');

  items.addItem(second);
  t.deepEqual(
    store.getStore().items,
    [edited, second],
    'second item added to cart in store'
  );
  t.deepEqual(items.getCart(), [edited, second], 'second item added to cart');

  items.updateItem('1', { name: 'first' });
  t.deepEqual(
    store.getStore().items,
    [first, second],
    'only first item edited in store'
  );
  t.deepEqual(
    items.getCart(),
    [first, second],
    'only first item edited in cart'
  );

  items.removeItem('2');
  t.deepEqual(
    store.getStore().items,
    [first],
    'second item removed from store'
  );
  t.deepEqual(items.getCart(), [first], 'second item removed from cart');

  items.clearCart();
  t.deepEqual(store.getStore().items, [], 'item is cleared in store');
  t.deepEqual(items.getCart(), [], 'items is cleared');
  t.end();
});

test('grocery: item methods', function (t) {
  const store = createStore();
  const test = store.createItem('test');

  t.deepEqual(
    store.getStore().test,
    {},
    'item with default value is added to store'
  );
  t.deepEqual(test.getItem(), {}, 'item with default value is created');
  t.end();
});
