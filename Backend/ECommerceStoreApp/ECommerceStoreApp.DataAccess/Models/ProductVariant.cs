using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceStoreApp.DataAccess.Models
{
    public class ProductVariant : GenericModel
    {
        public string Label { get; set; }
        public string Image { get; set; }
        public string Color { get; set; }
        public Guid ProductId { get; set; }

        // Sizes
        public int QuantityXS { get; set; }
        public int QuantityS { get; set; }
        public int QuantityM { get; set; }
        public int QuantityL { get; set; }
        public int QuantityXL { get; set; }
        public int QuantityXXL { get; set; }
    }
}
