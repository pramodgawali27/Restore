import { useEffect, useState } from "react";
import { IProduct } from "./IProduct";

function App() {
  let [products,setProducts] = useState<IProduct[]>([]);

  useEffect(()=>{
     fetch('http://localhost:5051/api/products')
     .then(response=>response.json())
     .then(data => setProducts(data));
  },[]);

function addProduct(){
  setProducts(prevState => [
    ...prevState,
    {
      productId : prevState.length + 101,
      productName : 'p' + (prevState.length + 1),
      price :(prevState.length*100) + 100,
      description :'test',
      brand:'brrand'
    }
  ])
}

  return (
    <div>
      <h1>Ecomerce</h1>
      <ul>
        {products.map(product=>(
          <li key={product.productId}>{product.productName} - {product.price}</li>
        ))}
      </ul>
      <button onClick={addProduct}>add Product</button>
    </div>
  );
}

export default App;
