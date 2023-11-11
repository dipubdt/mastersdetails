using System.ComponentModel.DataAnnotations;

namespace MasterDetails.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Display(Name = "Product Name")]
        public string ProductName { get; set; }

        [Display(Name = "Product Code")]
        public string ProductCode { get; set; }

        public string Discription { get; set; }


        public virtual ICollection<PurchaseProduct> PurchaseItems { get; set; }
    }
}
