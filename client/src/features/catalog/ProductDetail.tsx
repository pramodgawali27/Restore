import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../../app/models/IProduct";

export default function ProductDetail(){
    const {id}=useParams<{id:string}>();
    const [product,setProduct] = useState<IProduct | null>(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5051/api/products/${id}`)
           .then(response => setProduct(response.data))
           .catch(error => console.log(error))
           .finally(() => setLoading(false));
    },[id]);
    
    if(loading) return <h3>loading</h3>

    if(!product) return <h3>Product not found</h3>

    return(
        <>
       <Grid container spacing={6}>
         <Grid item xs={6}>
           <img src={product.pictureUrl} alt={product.productName} style={{width : '100%'}}/>
         </Grid>
         <Grid item xs={6}>
           <Typography variant="h3">{product.productName}</Typography>
           <Divider sx={{mb:2}} />
           <Typography variant="h4" color='secondary'>${(product.price/100).toFixed(2)}</Typography>
           <TableContainer>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>{product.productName}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>{product.description}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>{product.type}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Brand</TableCell>
                        <TableCell>{product.brand}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>uantity in Stock</TableCell>
                        <TableCell>{product.quantityInStock}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
           </TableContainer>
         </Grid>
       </Grid>
        </>
    )
}