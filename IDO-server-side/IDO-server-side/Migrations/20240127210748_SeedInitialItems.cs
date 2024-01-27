using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IDO_server_side.Migrations
{
    public partial class SeedInitialItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "id", "category", "dueDate", "estimate", "importance", "name", "status", "userId" },
                values: new object[,]
                {
                    { 1, "Follow Up", "01/10/2022", "0.5 hours", "medium", "Contact the support team of XYZ software to ask about the guarantee pricing", "toDo", 1 },
                    { 2, "Final Year Project", "None", "15 minutes", "", "Email the faculty director about the progress", "done", 1 },
                    { 3, "House improvements", "None", "1 hour", "medium", "Fix the power button of the TV", "doing", 1 },
                    { 4, "General cleanup", "12/10/2022", "3 hours", "low", "Format the PC", "toDo", 1 },
                    { 5, "final year project", "01/01/2022", "8 days", "hight", "Prepare The XD Design", "done", 1 },
                    { 6, "Job opportunity", "10/10/2022", "2 hours", "low", "Translate The Resume", "doing", 1 },
                    { 7, "Job opportunity", "Sunday at midnight", "5 days", "hight", "Do OSD Assessment", "doing", 1 },
                    { 8, "Education", "12/12/2022", "6 hours", "hight", "Prepare The Assay", "toDo", 1 },
                    { 9, "Work", "02/28/2023", "10 hours", "hight", "Complete Project Proposal", "toDo", 2 },
                    { 10, "Education", "03/15/2023", "2 hours", "medium", "Read Chapter 5 for Exam", "toDo", 2 },
                    { 11, "Personal", "Tomorrow", "5 hours", "hight", "Plan Weekend Trip", "toDo", 2 },
                    { 12, "Career", "None", "3 hours", "medium", "Update Resume", "toDo", 2 },
                    { 13, "Health", "02/20/2023", "1 hour", "medium", "Exercise Session", "toDo", 2 },
                    { 14, "Personal Development", "03/10/2023", "4 hours", "hight", "Research New Technologies", "doing", 3 },
                    { 15, "Errands", "None", "1.5 hours", "low", "Grocery Shopping", "done", 3 },
                    { 16, "Hobby", "03/05/2023", "3 hours", "medium", "Write Blog Post", "done", 3 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "id",
                keyValue: 16);
        }
    }
}
