import Card from 'react-bootstrap/Card';
import '../App.css'

function ProductCard({id, name, brand = 'Без бренда', price}) {
  return (
    <Card className="card">
      <Card.Body className='card-body'>
        <Card.Title className='card-title'>{ name }</Card.Title>
        <Card.Subtitle style={{fontSize: '20px'}} className="mb-2 text-muted">{ brand }</Card.Subtitle>
        <Card.Text className='price'>
          Цена: 
        <span class="pricetag">{ price }</span>
        </Card.Text>
        <Card.Text style={{fontSize: '15px'}}>Идентификатор:{ id }</Card.Text>

      </Card.Body>
    </Card>
  );
}

export default ProductCard;