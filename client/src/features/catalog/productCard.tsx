import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IProduct } from "../../app/models/IProduct";

interface Props{
    product : IProduct;
}

export default function productCard({product}:Props){
    return(
        <>
         <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{bgcolor:'secondary.main'}}>
                {product.productName.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={product.productName}
            titleTypographyProps={{sx:{fontWeight:'bold',color:'primary.main'}}}
          />
      <CardMedia
        sx={{height:140,backgroundSize:'contain',bgcolor:'primary.light'}}
        image={product.pictureUrl}
        title ={product.productName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color="secondary">
          ${(product.price/100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {product.brand}/{product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to Cart</Button>
        <Button size="small" component={Link} to={`/catalog/${product.productId}`}>View</Button>
      </CardActions>
    </Card>
      </>
    )
}