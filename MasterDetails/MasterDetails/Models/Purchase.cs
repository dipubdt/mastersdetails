using System.ComponentModel.DataAnnotations;

namespace MasterDetails.Models
{
    public class Purchase
    {
        public int Id { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [Display(Name = "Purchase Date")]
        public DateTime PurchaseDate { get; set; }

        [Required]
        [Display(Name = "Purchase Code")]
        public string PurchaseCode { get; set; }

        [Display(Name = "Purchase Type")]
        public string PurchaseType { get; set; }

        [Display(Name = "Supplier")]
        [Required]
        public int SupplierId { get; set; }
        public  Supplier Supplier { get; set; }

        [Display(Name = "Total Amount")]
        public double? TotalAmount { get; set; }

        [Display(Name = "Discount Percent")]
        public double? DiscountPercent { get; set; }

        [Display(Name = "Discount Amount")]
        public double? DiscountAmount { get; set; }

        [Display(Name = "Vat Percent")]
        public double? VatPercent { get; set; }

        [Display(Name = "Vat Amount")]
        public double? VatAmount { get; set; }

        [Display(Name = "Payment Amount")]
        public double? PaymentAmount { get; set; }

        public virtual List<PurchaseProduct> PurchaseProducts { get; set; } = new List<PurchaseProduct>();

    }
}
