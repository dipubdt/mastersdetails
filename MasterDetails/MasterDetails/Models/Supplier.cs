using System.ComponentModel.DataAnnotations;

namespace MasterDetails.Models
{
    public class Supplier
    {
        public int Id { get; set; }

        [Display(Name = "Supplier Name")]
        public string SupplierName { get; set; }

        [Display(Name = "Phone Number")]
        public string PhoneNumber { get; set; }

        [Display(Name = "Email Address")]
        [DataType(DataType.EmailAddress)]
        public string EmailAddress { get; set; }

        public IList<Purchase> Purchases { get; set; }
    }
}
