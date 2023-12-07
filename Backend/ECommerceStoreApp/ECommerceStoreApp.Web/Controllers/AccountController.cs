using ECommerceStoreApp.Business.DTOs;
using ECommerceStoreApp.Business.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceStoreApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AuthService _authService;

        public AccountController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterDTO model)
        {
            if (ModelState.IsValid) // Check if the incoming model is valid
            {
                var result = await _authService.RegisterUserAsync(model);

                if (result.Succeeded)
                {
                    // User was successfully created
                    return Ok(model); // Consider returning a different object that doesn't include sensitive data like passwords
                }
                else
                {
                    // User creation failed, return the errors to the client
                    return BadRequest(result.Errors);
                }
            }

            // Model state is not valid, return the validation errors
            return BadRequest(ModelState);
        }
    }
}
