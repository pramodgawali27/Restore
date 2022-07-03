namespace API.Entities
{
    public class Basket{
public int Id { get; set; }
public string BuyerId { get; set; } 

public List<BasketItem> Items{ get; set; }=new();


public void AddItem(Product product,int quantity){
    
    if(Items.All(item => item.ProductId != product.ProductId)){
        Items.Add(new BasketItem{Product = product,Quantity = quantity});
    }

    var existingItem = Items.FirstOrDefault(item => item.ProductId == product.ProductId);

    if(existingItem != null) existingItem.Quantity +=quantity;
}

public void RemoveItem(int productId,int quantity){
    
 var Item = Items.FirstOrDefault(item => item.ProductId == productId);

if(Item == null) return;

Item.Quantity -= quantity;

if(Item.Quantity == 0)  Items.Remove(Item);
}


    }
}