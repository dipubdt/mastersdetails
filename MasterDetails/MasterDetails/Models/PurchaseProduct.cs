using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MasterDetails.Models
{
    public class PurchaseProduct
    {
        public int Id { get; set; }

        [Required]
        [ForeignKey("Purchase")]
        public int PurchaseId { get; set; }
        public Purchase Purchase { get; set; }

        [Display(Name = "Product")]
        [ForeignKey("Product")]
        [Required]
        public int ProductId { get; set; }
        public Product Product { get; set; } 

        [Required]
        [Display(Name = "Batch Number")]
        public string BatchNumber { get; set; }

        [Required]
        [Range(1, 10000000, ErrorMessage = "Quantity should be greater than 0")]
        public double Quantity { get; set; }


        [Range(1, 10000000, ErrorMessage = "Purchase Price should be greater than 0")]
        [Display(Name = "Purchase Price")]
        [Required]
        public double PurchasePrice { get; set; }

        [Display(Name = "Sell Price")]
        [Range(1, 10000000, ErrorMessage = "Purchase Price should be greater than 0")]
        [Required]
        public double SellPrice { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "Expiration Date")]
        [Required]
        public DateTime ExpirationDate { get; set; }

        [NotMapped]
        public double Amount { get; set; }

        [NotMapped]
        public bool IsDeleted { get; set; } = false;

        
    }
}
