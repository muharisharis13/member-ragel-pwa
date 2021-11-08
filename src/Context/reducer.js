export const reducer = (state, action) => {

  switch (action.type) {

    case 'CART':
      return {
        ...state,
        cart: action.cart
      }
    // break;
    case 'USER_INFO':
      return {
        ...state,
        arrUserInfo: action.arrUserInfo
      }
    // break;

    default:
      alert('error reducer')
      break;
  }
}