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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(Guid id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            return Ok(product);
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

        [HttpDelete()]
        public async Task<IActionResult> DeleteProductById(Guid id)
        {
            await _productService.RemoveProductByIdAsync(id);
            await _productService.SaveAsync();
            return Ok();
        }

        [HttpDelete("RemoveAllProducts")]
        public async Task<IActionResult> DeleteAllProducts()
        {
            await _productService.RemoveAllProductsAsync();
            await _productService.SaveAsync();
            return Ok();
        }
    }
}
