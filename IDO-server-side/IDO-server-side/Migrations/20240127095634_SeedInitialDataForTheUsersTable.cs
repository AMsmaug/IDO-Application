using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IDO_server_side.Migrations
{
    public partial class SeedInitialDataForTheUsersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "userId", "email", "password" },
                values: new object[] { 1, "ammarmalass@gmail.com", "$2a$13$5lSI0CYJ1fXqOCX.zi3mRucHkvHvzPz8DK0Mxw5lNEBD5zsNts6gW" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "userId", "email", "password" },
                values: new object[] { 2, "ahmadali@gmail.com", "$2a$13$nPl1ao4HDzQC0jYLVbZi.uMndoYV15N9bY5PSuIAUzi0wGtzcPG4u" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "userId", "email", "password" },
                values: new object[] { 3, "khaledtaha@gmail.com", "$2a$13$beBLC.2xOmr9AArMNAVhlO7LuqbXzMsoqfIdaVG.tO45./DrzU8Py" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "userId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "userId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "userId",
                keyValue: 3);
        }
    }
}
