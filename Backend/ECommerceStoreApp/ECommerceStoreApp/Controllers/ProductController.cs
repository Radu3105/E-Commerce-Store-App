using ECommerceStoreApp.Domain.Common;
using ECommerceStoreApp.Domain.Entities;
using ECommerceStoreApp.Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceStoreApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts(int pageNumber = 1, int pageSize = 10)
        {
            var products = await _productService.GetPagedProductsAsync(pageNumber, pageSize);
            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] Product product)
        {
            var createdProduct = await _productService.AddProductAsync(product);
            await _productService.SaveAsync();
            return CreatedAtAction(nameof(GetProducts), new { id = createdProduct.Id }, createdProduct);
        }

        [HttpPost("AddProductsRange")]
        public async Task<IActionResult> AddProductsRange([FromBody] IEnumerable<Product> products)
        {
            var createdProducts = await _productService.AddProductRangeAsync(products);
            await _productService.SaveAsync();
    
            return CreatedAtAction(nameof(GetProducts), createdProducts);
        }
    }
}
