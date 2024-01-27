using System.ComponentModel.DataAnnotations;

namespace IDO_server_side.Models
{
    public class ApplicationUser
    {
        [Key]
        public int userId { get; set; }

        public string email { get; set; }

        public string password { get; set; }
    }
}
