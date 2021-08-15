import { nanoid } from "nanoid";
import {
  ADD_CURRENT_EDIT_ID,
  ADD_SERVICE,
  FILTER_SERVICE,
  REMOVE_SERVICE,
} from "../actions/actionTypes";

const initialState = {
  currentEditItem: null,
  items: [
    { id: nanoid(), name: "Замена стекла", price: 21000 },
    { id: nanoid(), name: "Замена дисплея", price: 25000 },
  ],
};

const serviceListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENT_EDIT_ID:
      return {
        ...state,
        currentEditItem: action.payload,
      };
    case ADD_SERVICE:
      const { name, price } = action.payload;
      if (state.currentEditItem) {
        const findItem = state.items.find(
          (item) => state.currentEditItem === item.id
        );
        if (findItem) {
          const newArray = state.items.filter(
            (item) => state.currentEditItem !== item.id
          );
          return {
            items: [
              ...newArray,
              {
                name,
                price,
                id: state.currentEditItem,
              },
            ],
            currentEditItem: null,
          };
        }
      }
      if (state.find((el) => el.name === name)) {
        return state.map((el, i) => {
          if (el.name === name) {
            state[i].price = price;
          }
          return el;
        });
      } else {
        return [...state, { id: nanoid(), name, price: Number(price) }];
      }
    case FILTER_SERVICE:
      const { val } = action.payload;
      if (val.length > 0) {
        return state.filter((el) =>
          el.name.toLocaleLowerCase().includes(val.toLocaleLowerCase())
        );
      }
      return state;
    case REMOVE_SERVICE:
      const { id } = action.payload;
      return state.filter((service) => service.id !== id);
    default:
      return state;
  }
};

export default serviceListReducer;
