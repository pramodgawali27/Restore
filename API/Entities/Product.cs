namespace API.Entities
{
    public class Product{
public int ProductId { get; set; }
public string ProductName { get; set; } 

public string Description { get; set; }

public long Price {get;set;}

public string Type { get; set; }

public string Brand { get; set; }

public int QuantityInStock {get;set;}

public string PictureUrl { get; set; }


    }
}