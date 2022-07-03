using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers{
    [ApiController]
    [Route("api/[Controller]")]
    public class BasketController : ControllerBase
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext storeContext)
        {
            _context =storeContext;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDTO>> GetBasket()
        {
            var basket = await RetriveBasket();

            if (basket == null) return NotFound();
            return MapBasketToDTO(basket);
        }

        [HttpPost]
        public async Task<ActionResult<BasketDTO>> AddItemToBasket(int productId,int quantity){

          var basket = await RetriveBasket();
          if(basket == null) 
             basket = CreateBasket();

          var product = await _context.Products.FindAsync(productId);
          if(product == null) return NotFound();

          basket.AddItem(product,quantity);
             
          var result = await _context.SaveChangesAsync()>0;  
           
          if(result) return CreatedAtRoute("GetBasket",MapBasketToDTO(basket));

          return BadRequest(new ProblemDetails{Title = "Problem saving Item to basket"});
        }

        
        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId,int quantity){

            var basket = await RetriveBasket();

            if(basket == null) return NotFound();

            basket.RemoveItem(productId,quantity);

            var result = await _context.SaveChangesAsync()>0;

            if(result) return Ok();

            return BadRequest(new ProblemDetails{
                Title = "problem removing item from the basket"
            });
        }

        private async Task<Basket> RetriveBasket()
        {
            return await _context.Baskets
                 .Include(x => x.Items)
                 .ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            };

            Response.Cookies.Append("buyerId",buyerId,cookieOptions);
            var basket = new Basket{BuyerId = buyerId};
            _context.Baskets.Add(basket);

            return basket;

        }

        private BasketDTO MapBasketToDTO(Basket basket)
        {
            return new BasketDTO
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item =>
                            new BasketItemDto
                            {
                                ProductId = item.ProductId,
                                Name = item.Product.ProductName,
                                Price = item.Product.Price,
                                PictureUrl = item.Product.PictureUrl,
                                Type = item.Product.Type,
                                Brand = item.Product.Brand,
                                Quantity = item.Quantity
                            }).ToList()
            };
        }
    }

}