import { nanoid } from "nanoid";
import {
  ADD_CURRENT_EDIT_ID,
  ADD_SERVICE,
  REMOVE_SERVICE,
} from "../actions/actionTypes";

const initialState = {
  items: [
    { id: nanoid(), name: "Замена стекла", price: 21000 },
    { id: nanoid(), name: "Замена дисплея", price: 25000 },
  ],
  currentEditItem: null
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

              console.log('state => ', state)

      if (state.currentEditItem) {
        const findItem = state.items.find(
          (item) => state.currentEditItem === item.id
        );

              console.log('findItem => ', findItem)

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
      } else {
        return {
          items: [
            ...state.items,
            { id: nanoid(), name, price: Number(price) }
          ],
          currentEditItem: state.currentEditItem
        };
      }
    case REMOVE_SERVICE:
        const { id } = action.payload;
        const newArray = state.items.filter((item) => item.id !== id);
        return {
          items: [...newArray],
          currentEditItem: state.currentEditItem
        }
    default:
      return state;
  }
};

export default serviceListReducer;
