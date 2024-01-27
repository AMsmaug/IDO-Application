using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IDO_server_side.Models;
using Humanizer;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Xml.Linq;

namespace IDO_server_side.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IDODbContext _context;

        public ItemsController(IDODbContext context)
        {
            _context = context;
        }

        // To utilize when creating a new item
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }


        // To get items based on user id 
        [HttpGet("getItems")]
        public IActionResult GetItems()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userEmailClaim = User.FindFirst(ClaimTypes.Email)?.Value;

            var searchResults = _context.Items.Where(item => item.userId.ToString() == userIdClaim).ToList();

            return Ok(searchResults);
        }

        // To post a new item
        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(Item item)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (_context.Items == null)
            {
                return Problem("Entity set 'IDODbContext.MyProperty'  is null.");
            }
            if (userId != null)
            {
                var itemToStore = new Item
                {
                    name = item.name,
                    category = item.category,
                    dueDate = item.dueDate,
                    estimate = item.estimate,
                    importance = item.importance,
                    status = item.status,
                    userId = int.Parse(userId)
                };
                _context.Items.Add(itemToStore);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetItem", new { id = itemToStore.id }, itemToStore);
            }
            return BadRequest();
        }

        // To update an item status
        [HttpPost("{id}")]
        public async Task<ActionResult<Item>> UpdateItemStatus(int id, [FromBody] Item updatedItem)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (_context.Items == null)
            {
                return Problem("Entity set 'IDODbContext.Items' is null.");
            }

            var existingItem = await _context.Items.FindAsync(id);

            if (existingItem == null)
            {
                return NotFound(); 
            }

            _context.Items.Remove(existingItem);

            if (userId != null)
            {
                var itemToStore = new Item
                {
                    name = updatedItem.name,
                    category = updatedItem.category,
                    dueDate = updatedItem.dueDate,
                    estimate = updatedItem.estimate,
                    importance = updatedItem.importance,
                    status = updatedItem.status,
                    userId = int.Parse(userId)
                };

                _context.Items.Add(itemToStore);

                await _context.SaveChangesAsync();

                return CreatedAtAction("GetItem", new { id = itemToStore.id }, itemToStore);
            }
            return BadRequest();
        }

        // To update an item's input field
        [HttpPost("updateItem")]
        public async Task<ActionResult<Item>> UpdateItem(ItemToUpdate item)
        {
            if (_context.Items == null)
            {
                return Problem("Entity set 'IDODbContext.Items' is null.");
            }

            var existingItem = await _context.Items.FindAsync(item.id);

            if (existingItem == null)
            {
                return NotFound();
            }

            switch (item.fieldToUpdate)
            {
                case "name":
                    existingItem.name = item.newContent; 
                break;
                case "category":
                        existingItem.category = item.newContent; 
                break;
                case "dueDate":
                        existingItem.dueDate = item.newContent; 
                break;
                case "estimate":
                        existingItem.estimate = item.newContent; 
                break;
                case "importance":
                        existingItem.importance = item.newContent; 
                break;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            if (_context.Items == null)
            {
                return NotFound();
            }
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // To verify auth credentials
        [AllowAnonymous]
        [HttpPost("verifyCredentials")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = _context.Users.SingleOrDefault(user => user.email == model.Email);
            if (user == null)
            {
                return Unauthorized();
            }
            bool passwordMatch = BCrypt.Net.BCrypt.EnhancedVerify(model.Password, user.password);
            if (passwordMatch)
            {
                return Ok(TokenGeneration.GenerateToken(new TokenRequestModel(user.userId, user.email)));
            }
            else
            {
                return Unauthorized();
            }
        }

    }
}
