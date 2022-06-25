import { Grid} from "@mui/material";
import { IProduct } from "../../app/models/IProduct";
import ProductCard from "./productCard";

interface Props{
    products : IProduct [];
}

export default function productList({products}:Props){
    return(
        <Grid container spacing={4}>
        {products.map(product=>(
          <Grid item xs={3}>
            <ProductCard key={product.productId} product = {product}></ProductCard>
          </Grid>
          
        ))}
      </Grid>
    )
}