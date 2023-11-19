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

        // GET: api/<ProductController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }

        // POST: api/<ProductController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Product product)
        {
            var createdProduct = await _productService.AddProductAsync(product);
            await _productService.SaveAsync();
            return CreatedAtAction(nameof(Get), new { id = createdProduct.Id }, createdProduct);
        }
    }
}
