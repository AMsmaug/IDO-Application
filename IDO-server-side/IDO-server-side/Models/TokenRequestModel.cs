namespace IDO_server_side.Models
{
    public class TokenRequestModel
    {
        public int UserId {  get; set; }

        public string Email { get; set; }

        public TokenRequestModel(int userId, string email)
        {
            UserId = userId;
            Email = email;
        }

    }
}
