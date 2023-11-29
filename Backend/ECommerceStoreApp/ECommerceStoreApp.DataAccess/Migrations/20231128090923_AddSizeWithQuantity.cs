using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECommerceStoreApp.DataAccess.Migrations
{
    public partial class AddSizeWithQuantity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QuantityL",
                table: "ProductVariants",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "QuantityM",
                table: "ProductVariants",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "QuantityS",
                table: "ProductVariants",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "QuantityXL",
                table: "ProductVariants",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "QuantityXS",
                table: "ProductVariants",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "QuantityXXL",
                table: "ProductVariants",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuantityL",
                table: "ProductVariants");

            migrationBuilder.DropColumn(
                name: "QuantityM",
                table: "ProductVariants");

            migrationBuilder.DropColumn(
                name: "QuantityS",
                table: "ProductVariants");

            migrationBuilder.DropColumn(
                name: "QuantityXL",
                table: "ProductVariants");

            migrationBuilder.DropColumn(
                name: "QuantityXS",
                table: "ProductVariants");

            migrationBuilder.DropColumn(
                name: "QuantityXXL",
                table: "ProductVariants");
        }
    }
}
