import {Button} from '@mui/material';
import { useState, useEffect } from 'react';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import {IProduct} from '../../app/models/IProduct';
import ProductList from './productList';

export default function Catalog(){
    let [products,setProducts] = useState<IProduct[]>([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
       agent.Catalog.list()
       .then(response => setProducts(response))
       .catch(error=>console.log(error))
       .finally(() =>setLoading(false))
    },[]);

    if(loading) return <LoadingComponent message='loading product...'></LoadingComponent>

    return(
        <>
        <ProductList products={products}></ProductList>
        </>
    )
}