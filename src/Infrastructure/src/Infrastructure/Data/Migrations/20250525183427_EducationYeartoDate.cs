using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.src.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class EducationYeartoDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GraduationYear",
                table: "Educations");

            migrationBuilder.DropColumn(
                name: "StartYear",
                table: "Educations");

            migrationBuilder.AddColumn<DateTime>(
                name: "GraduationDate",
                table: "Educations",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Educations",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GraduationDate",
                table: "Educations");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Educations");

            migrationBuilder.AddColumn<int>(
                name: "GraduationYear",
                table: "Educations",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StartYear",
                table: "Educations",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
