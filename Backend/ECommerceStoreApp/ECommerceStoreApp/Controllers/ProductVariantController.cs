using ECommerceStoreApp.Domain.Entities;
using ECommerceStoreApp.Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceStoreApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductVariantController : ControllerBase
    {
        private readonly ProductVariantService _productVariantService;

        public ProductVariantController(ProductVariantService productVariantService)
        {
            _productVariantService = productVariantService;
        }

        [HttpPost]
        public async Task<IActionResult> AddProductVariant([FromBody] ProductVariant productVariant)
        {
            var createdProductVariant = await _productVariantService.AddProductVariantAsync(productVariant);
            await _productVariantService.SaveAsync();
            return Ok(createdProductVariant);
        }
    }
}
