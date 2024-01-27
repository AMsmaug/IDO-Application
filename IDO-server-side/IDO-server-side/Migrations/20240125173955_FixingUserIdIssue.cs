using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IDO_server_side.Migrations
{
    public partial class FixingUserIdIssue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "useId",
                table: "Items",
                newName: "userId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "userId",
                table: "Items",
                newName: "useId");
        }
    }
}
