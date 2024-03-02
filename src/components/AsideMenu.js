import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../App.css'
import { getFilterProduct } from "../http/productStore";
import { useDispatch } from "react-redux";
import { getProduct } from "../http/productStore";
import { useState } from "react";
import ReactLoading from "react-loading";



export const AsideMenu = ({ name, type, firstProductIndex, lastIdIndex ,setProduct}) => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()


  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    console.log(formData.myInput)
    const formJson = Object.fromEntries(formData.entries());
    if (name === 'цене') {
      const myInput = { price: Number(formJson.myInput) }
      console.log(myInput);
      getFilterProduct(myInput)
        .then(res => {
          const list = Array.from(new Set(res.result));
          console.log(list)
          if (list.length === 0) {
            alert('Значение не найдено')
            setIsLoading(false)
            return []
          } else {
            dispatch({ type: 'SET_ID', ids: list })
            return list;
          }
        })
        .then(res => {
          
          getProduct(res.slice(firstProductIndex, lastIdIndex))
            .then(res => dispatch({ type: 'SET_LIST', products: res.result }));
          setIsLoading(false)
          
        })
    }
    if (name === 'названию') {
      const myInput = { product: formJson.myInput }
      console.log(myInput);
      getFilterProduct(myInput)
        .then(res => {
          const list = Array.from(new Set(res.result));
          console.log(list)
          if (list.length === 0) {
            alert('Значение не найдено')
            setIsLoading(false)

            return []
          } else {
            dispatch({ type: 'SET_ID', ids: list })
            return list;
          }
        })
        .then(res => {

          getProduct(res.slice(firstProductIndex, lastIdIndex))
            .then(res => dispatch({ type: 'SET_LIST', products: res.result }));
          setIsLoading(false)
          
        })
    }
    if (name === 'бренду') {
      const myInput = { brand: formJson.myInput }
      console.log(myInput);
      getFilterProduct(myInput)
        .then(res => {
          const list = Array.from(new Set(res.result));
          console.log(list)
          if (list.length === 0) {
            alert('Значение не найдено')
            setIsLoading(false)
            return []
          } else {
            dispatch({ type: 'SET_ID', ids: list })
            return list;
          }
        })
        .then(res => {
          getProduct(res.slice(firstProductIndex, lastIdIndex))
            .then(res => dispatch({ type: 'SET_LIST', products: res.result }));
          setIsLoading(false)
        })
    }

  }
  let loading;

  if (isLoading == true) {
    loading = <ReactLoading type={'spinningBubbles'} color="#000" width={'30px'} height={'30px'} />
  } else {
    loading = <input placeholder={`Пример: ${type}`} name="myInput" className="form-field" />
  }
  return (
    <Container className="aside-menu">
      <form method="post" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <label style={{ fontSize: '20px' }}>Фильтровать по {name}:
            {loading}
          </label>
        </Form.Group>
        <Button className="aside-btn static" variant="primary" type="submit">
          Поиск
        </Button>
      </form>
    </Container>

  );
}

