using ECommerceStoreApp.Business.DTOs;
using ECommerceStoreApp.DataAccess.Context;
using ECommerceStoreApp.DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceStoreApp.Business.Services
{
    public class AuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public AuthService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IdentityResult> RegisterUserAsync(RegisterDTO model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                // Log the errors or throw an exception
                foreach (var error in result.Errors)
                {
                    // Handle errors, e.g., log them or add them to a list to return to the client
                    Console.WriteLine(error.Description); // Just for demonstration
                }
            }
            return result;
        }
    }
}
