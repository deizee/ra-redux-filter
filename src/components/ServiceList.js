import {useDispatch, useSelector} from "react-redux";
import {removeService, EditService, clearService, filterService} from '../actions/actionCreators';


const ServiceList = () => {
    const items = useSelector(state => state.serviceList);
    const formState = useSelector(state => state.serviceAdd);
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        // очищаем форму ввода если удаляем редактируемый элемент
        if (formState.name === items.find((el) => el.id === id).name) {
            dispatch(clearService());
        }
        dispatch(removeService(id));
    }

    const handleEdit = (name,price) => {
        dispatch(EditService(name,price));
    }

    const filterHandler = (evt) => {
        dispatch(filterService(evt.target.value));
    }

    return (
        <>
            <span>Фильтр</span>
            <input name="filter" onChange={filterHandler} />
            <ul>
                {items.map(o => (
                    <li key={o.id}>
                        {o.name} {o.price}
                        <button onClick={() => handleRemove(o.id)}>✕</button>
                        <button onClick={() => handleEdit(o.name, o.price)}>✎</button>
                    </li>))
                }
            </ul>
        </>
    );
};

export default ServiceList;
