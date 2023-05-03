import {
  ADD_ITEM_IN_CART,
  DELETE_ITEM_FROM_CART,
  LOAD_CART_DATA,
} from '../actions/actionType';

const initialState = {
  cartItems: [],
  length: 0,
};

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function checkCart(product, cart) {
  return cart.findIndex(
    (item) => item.title === product.title && item.size === product.size,
  );
}

function addItem(cart, item) {
  const productId = checkCart(item, cart);
  if (productId === -1) {
    cart.push(item);
  } else {
    const oldProductData = cart[productId];
    cart[productId] = {
      ...oldProductData,
      count: oldProductData.count + item.count,
    };
  }
}

function deleteItem(cart, id) {
  cart.splice(id, 1);
}

function saveOnLocalStorage(arr) {
  localStorage.setItem('cart', JSON.stringify(arr));
}

function updateCart(type, value) {
  const cart = getCart();

  switch (type) {
    case 'add':
      addItem(cart, value.item);
      break;
    case 'delete':
      deleteItem(cart, value.id);
      break;
    default:
      return false;
  }

  saveOnLocalStorage(cart);

  return cart;
}

export default function cartReducer(state = initialState, action) {
  const cartItems = getCart();
  switch (action.type) {
    case LOAD_CART_DATA:
      return { cartItems, length: cartItems.length };
    case ADD_ITEM_IN_CART:
      return {
        cartItems: updateCart('add', { item: action.payload }), length: state.length + 1,
      };
    case DELETE_ITEM_FROM_CART:
      return {
        cartItems: updateCart('delete', { id: action.payload }), length: state.length - 1,
      };
    default:
      return state;
  }
}
