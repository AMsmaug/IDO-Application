using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.Net.NetworkInformation;
using System.Xml.Linq;

namespace IDO_server_side.Models
{
    public class IDODbContext : DbContext
    {
        public IDODbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Item> Items { get; set; }
        public DbSet<ApplicationUser> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed initial data for the Users table
            modelBuilder.Entity<ApplicationUser>().HasData(
                new ApplicationUser { userId = 1, email = "ammarmalass@gmail.com", password = "$2a$13$5lSI0CYJ1fXqOCX.zi3mRucHkvHvzPz8DK0Mxw5lNEBD5zsNts6gW" },
                new ApplicationUser { userId = 2, email = "ahmadali@gmail.com", password = "$2a$13$nPl1ao4HDzQC0jYLVbZi.uMndoYV15N9bY5PSuIAUzi0wGtzcPG4u" },
                new ApplicationUser { userId = 3, email = "khaledtaha@gmail.com", password = "$2a$13$beBLC.2xOmr9AArMNAVhlO7LuqbXzMsoqfIdaVG.tO45./DrzU8Py" }
            );

            // Seed initial data for the Items table
            modelBuilder.Entity<Item>().HasData(
                new Item { id = 1, name = "Contact the support team of XYZ software to ask about the guarantee pricing", category = "Follow Up", dueDate = "01/10/2022", estimate = "0.5 hours", importance = "medium", status = "toDo", userId = 1 },
                new Item { id = 2, name = "Email the faculty director about the progress", category = "Final Year Project", dueDate = "None", estimate = "15 minutes", importance = "", status = "done", userId = 1 },
                new Item { id = 3, name = "Fix the power button of the TV", category = "House improvements", dueDate = "None", estimate = "1 hour", importance = "medium", status = "doing", userId = 1 },
                new Item { id = 4, name = "Format the PC", category = "General cleanup", dueDate = "12/10/2022", estimate = "3 hours", importance = "low", status = "toDo", userId = 1 },
                new Item { id = 5, name = "Prepare The XD Design", category = "final year project", dueDate = "01/01/2022", estimate = "8 days", importance = "hight", status = "done", userId = 1 },
                new Item { id = 6, name = "Translate The Resume", category = "Job opportunity", dueDate = "10/10/2022", estimate = "2 hours", importance = "low", status = "doing", userId = 1 },
                new Item { id = 7, name = "Do OSD Assessment", category = "Job opportunity", dueDate = "Sunday at midnight", estimate = "5 days", importance = "hight", status = "doing", userId = 1 },
                new Item { id = 8, name = "Prepare The Assay", category = "Education", dueDate = "12/12/2022", estimate = "6 hours", importance = "hight", status = "toDo", userId = 1 },
                new Item { id = 9, name = "Complete Project Proposal", category = "Work", dueDate = "02/28/2023", estimate = "10 hours", importance = "hight", status = "toDo", userId = 2 },
                new Item { id = 10, name = "Read Chapter 5 for Exam", category = "Education", dueDate = "03/15/2023", estimate = "2 hours", importance = "medium", status = "toDo", userId = 2 },
                new Item { id = 11, name = "Plan Weekend Trip", category = "Personal", dueDate = "Tomorrow", estimate = "5 hours", importance = "hight", status = "toDo", userId = 2 },
                new Item { id = 12, name = "Update Resume", category = "Career", dueDate = "None", estimate = "3 hours", importance = "medium", status = "toDo", userId = 2 },
                new Item { id = 13, name = "Exercise Session", category = "Health", dueDate = "02/20/2023", estimate = "1 hour", importance = "medium", status = "toDo", userId = 2 },
                new Item { id = 14, name = "Research New Technologies", category = "Personal Development", dueDate = "03/10/2023", estimate = "4 hours", importance = "hight", status = "doing", userId = 3 },
                new Item { id = 15, name = "Grocery Shopping", category = "Errands", dueDate = "None", estimate = "1.5 hours", importance = "low", status = "done", userId = 3 },
                new Item { id = 16, name = "Write Blog Post", category = "Hobby", dueDate = "03/05/2023", estimate = "3 hours", importance = "medium", status = "done", userId = 3 }
            );
        }
    }
}
