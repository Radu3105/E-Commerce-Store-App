using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceStoreApp.DataAccess.Models
{
    public class Product : GenericModel
    {
        public string Title { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public ICollection<ProductVariant>? Variants { get; set; }
    }
}
