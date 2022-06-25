import {Button} from '@mui/material';
import { useState, useEffect } from 'react';
import {IProduct} from '../../app/models/IProduct';
import ProductList from './productList';

export default function Catalog(){
    let [products,setProducts] = useState<IProduct[]>([]);

    useEffect(()=>{
       fetch('http://localhost:5051/api/products')
       .then(response=>response.json())
       .then(data => setProducts(data));
    },[]);

    return(
        <>
        <ProductList products={products}></ProductList>
        </>
    )
}