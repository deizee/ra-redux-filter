import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCurrentEditId,
  removeService,
  EditService,
  clearService,
} from "../actions/actionCreators";

const ServiceList = () => {
  const items = useSelector((state) => state.serviceList.items);
  const formState = useSelector((state) => state.serviceAdd);
  const [filteredItems, setFilteredItems] = useState(items);
  const [inputFilter, setInputFilter] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredItems([...items])
  }, [items]);

  useEffect(() => {
    if (inputFilter.trim().length === 0) {
      setFilteredItems([...items]);
      return;
    }
    const filteredArray = filteredItems.filter((item) => item.name.toLowerCase().includes(inputFilter.toLowerCase()));
    setFilteredItems(filteredArray);
  }, [inputFilter]);



  const handleRemove = (id) => {
    // очищаем форму ввода если удаляем редактируемый элемент
    if (formState.name === items.find((el) => el.id === id).name) {
      dispatch(clearService());
    }
    dispatch(removeService(id));
  };

  const handleEdit = (name, price, id) => {
    dispatch(addCurrentEditId(id));
    dispatch(EditService(name, price, id));
  };

  const filterHandler = (evt) => {
    setInputFilter(evt.target.value);
  };

  return (
    <>
      <span>Фильтр</span>
      <input name="filter" onChange={filterHandler} value={inputFilter} />
      <ul>
        {filteredItems.map((o) => (
          <li key={o.id}>
            {o.name} {o.price}
            <button onClick={() => handleRemove(o.id)}>✕</button>
            <button onClick={() => handleEdit(o.name, o.price, o.id)}>✎</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ServiceList;
