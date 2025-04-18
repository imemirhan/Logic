using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class JobApplicationEmployerIdAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployerId",
                table: "JobApplications",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_EmployerId",
                table: "JobApplications",
                column: "EmployerId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobApplications_Employers_EmployerId",
                table: "JobApplications",
                column: "EmployerId",
                principalTable: "Employers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobApplications_Employers_EmployerId",
                table: "JobApplications");

            migrationBuilder.DropIndex(
                name: "IX_JobApplications_EmployerId",
                table: "JobApplications");

            migrationBuilder.DropColumn(
                name: "EmployerId",
                table: "JobApplications");
        }
    }
}
