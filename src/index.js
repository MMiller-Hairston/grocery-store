function createStore() {
  let state = {};

  function updateState(name, payload) {
    const updatedState = {
      ...state,
      [name]: payload,
    };
    state = updatedState;
  }

  function getStore() {
    return state;
  }

  function createCart(name, identifier = 'id', defaultValue = []) {
    if (!name) {
      throw new Error('Name is required for cart to be a part of the store');
    }

    if (name in state) {
      throw new Error('Name should be unique');
    }
    let currentValue = defaultValue;
    updateState(name, currentValue);

    function getCart() {
      return currentValue;
    }

    function updateItem(id, payload) {
      const index = currentValue.findIndex((item) => item[identifier] === id);
      if (index === -1) {
        throw new Error('An element with that identifier was not found');
      }
      const newArray = currentValue.map((item, i) => {
        if (i !== index) return item;
        return {
          ...item,
          ...payload,
        };
      });
      currentValue = newArray;
      updateState(name, newArray);
      return newArray;
    }

    function addItem(payload) {
      const index = currentValue.findIndex(
        (item) => payload[identifier] === item[identifier]
      );
      if (index !== -1) {
        throw new Error(
          'An element with that identifier is already in the cart, you should update it instead'
        );
      }
      let newArray = [...currentValue, payload];
      currentValue = newArray;
      updateState(name, newArray);
      return newArray;
    }

    function removeItem(id) {
      const index = currentValue.findIndex((item) => item[identifier] === id);
      if (index === -1) {
        throw new Error('An element with that identifier was not found');
      }
      let newArray = currentValue.slice();
      newArray.splice(index, 1);
      currentValue = newArray;
      updateState(name, newArray);
      return newArray;
    }

    function clearCart() {
      currentValue = defaultValue;
      updateState(name, defaultValue);
    }

    return {
      getCart,
      updateItem,
      addItem,
      removeItem,
      clearCart,
    };
  }

  function createItem(name, defaultValue = {}) {
    if (!name) {
      throw new Error('Name is required for cart to be a part of the store');
    }

    if (name in state) {
      throw new Error('Name should be unique');
    }

    function getItem() {
      return currentValue;
    }

    let currentValue = defaultValue;
    updateState(name, currentValue);

    function updateItem(payload) {
      const updatedItem = {
        ...currentValue,
        ...payload,
      };
      currentValue = updatedItem;
      updateState(name, updatedItem);
      return updatedItem;
    }

    function clearItem() {
      currentValue = defaultValue;
      updateState(name, defaultValue);
      return currentValue;
    }

    return {
      getItem,
      updateItem,
      clearItem,
    };
  }

  const store = {
    getStore,
    createCart,
    createItem,
  };

  return store;
}

module.exports = createStore;
