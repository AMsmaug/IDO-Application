using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IDO_server_side.Migrations
{
    public partial class AddingUserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "useId",
                table: "MyProperty",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "useId",
                table: "MyProperty");
        }
    }
}
