using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace IDO_server_side.Models
{
    public class TokenGeneration
    {
        public static async Task<TokenResponse> GenerateToken(TokenRequestModel model)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, model.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, model.Email),
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(5),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes("HelloMyFriendThisIsMySecurityKey")),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new TokenResponse(tokenHandler.WriteToken(token), tokenDescriptor.Expires);
        }
    }
}

public class TokenResponse
{
    public string Token { get; set; }
    public DateTime? Expiration { get; set; }
    public TokenResponse(string token, DateTime? expiration)
    {
        Token = token;
        Expiration = expiration;
    }
}