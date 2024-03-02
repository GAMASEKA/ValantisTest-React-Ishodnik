import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './components/ProductCard';
import Container from 'react-bootstrap/Container';
import { AsideMenu } from './components/AsideMenu';
import { useEffect, useState } from 'react';
import { getStore, getProduct } from './http/productStore';
import Pagination from './components/Pagination';
import './App.css'
import ReactLoading from "react-loading";



function App() {

  const [isLoading, setIsLoading] = useState(true)

  const ids = useSelector(state => state.idList)
  const products = useSelector(state => state.productsList)
  const dispatch = useDispatch()
  useEffect(() => {
    getStore()
    .then(res => {
      const list = Array.from(new Set(res.result));
      dispatch({ type: 'SET_ID', ids: list });
      return list;
    })
    .then(res => {
      getProduct(res.slice(firstProductIndex, lastIdIndex))
        .then(res => {
          dispatch({ type: 'SET_LIST', products: res.result })
          setIsLoading(false)
        });
    })
  }, []);
  
  console.log(ids, products)

  // Пагинация
  const [currentPage, setCurrentPage] = useState(1)
  const [productPerPage] = useState(50)

  const lastIdIndex = currentPage * productPerPage
  const firstProductIndex = lastIdIndex - productPerPage
  const currentIds = ids.slice(firstProductIndex, lastIdIndex)
  function getProductList(page) {
    setIsLoading(true)
    let newLastIndex = page * productPerPage
    let newFirstIndex = newLastIndex - productPerPage
    let currentPage = ids.slice(newFirstIndex, newLastIndex)
    try {
      getProduct(currentPage).then(res => {
        setIsLoading(false)
        dispatch({ type: 'SET_LIST', products: res.result })})
    } catch (error) {
      console.log(error)
    }
   
  }
  // getProduct(currentIds).then(res => dispatch({ type: 'SET_LIST', products: res.result }))
  let loading;
  let empty;


  if (isLoading == true) {
   loading =<Container className='loading'><ReactLoading type={'spinningBubbles'} color="#fff" /></Container> 
  }
  else {
    loading =  <Container className='aside-block'>
            <AsideMenu type={'17500'} name='цене' firstProductIndex={firstProductIndex} lastIdIndex={lastIdIndex}></AsideMenu>
            <AsideMenu type={'Золотое кольцо с бриллиантами'} name='названию' firstProductIndex={firstProductIndex} lastIdIndex={lastIdIndex}></AsideMenu>
            <AsideMenu type={'Pomellato'} name='бренду' firstProductIndex={firstProductIndex} lastIdIndex={lastIdIndex}></AsideMenu>
          </Container>
  }

  if (ids.length === 0 || products.length === 0) {
    empty = <Container className='loading'><h1>Ничего не найдено</h1></Container>
  } else {
    empty = <Container className='product-block'>
    {products.map(product => <ProductCard id={product.id} name={product.product} price={product.price} brand={product.brand}></ProductCard>)}
  </Container>
  }

  
    const setProduct = pageNumber => getProductList(pageNumber)
    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
      <Container className='body'>
        <div className='header'>
          <h1 className='title'>Valantis</h1>

        </div>
        <Container className='section'>

          {empty}
          {loading}
          <Pagination setLoading={isLoading} productPerPage={productPerPage} totalProducts={ids.length} paginate={paginate} setProduct={setProduct}></Pagination>
        </Container>
      </Container>
    );
  }
  
  export default App;
