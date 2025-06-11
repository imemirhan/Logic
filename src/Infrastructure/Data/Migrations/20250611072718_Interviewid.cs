using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class Interviewid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobSeekerNotifications_Interviews_InterviewId1",
                table: "JobSeekerNotifications");

            migrationBuilder.DropIndex(
                name: "IX_JobSeekerNotifications_InterviewId1",
                table: "JobSeekerNotifications");

            migrationBuilder.DropColumn(
                name: "InterviewId1",
                table: "JobSeekerNotifications");

            migrationBuilder.AlterColumn<int>(
                name: "InterviewId",
                table: "JobSeekerNotifications",
                type: "integer",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobSeekerNotifications_InterviewId",
                table: "JobSeekerNotifications",
                column: "InterviewId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobSeekerNotifications_Interviews_InterviewId",
                table: "JobSeekerNotifications",
                column: "InterviewId",
                principalTable: "Interviews",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobSeekerNotifications_Interviews_InterviewId",
                table: "JobSeekerNotifications");

            migrationBuilder.DropIndex(
                name: "IX_JobSeekerNotifications_InterviewId",
                table: "JobSeekerNotifications");

            migrationBuilder.AlterColumn<long>(
                name: "InterviewId",
                table: "JobSeekerNotifications",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InterviewId1",
                table: "JobSeekerNotifications",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobSeekerNotifications_InterviewId1",
                table: "JobSeekerNotifications",
                column: "InterviewId1");

            migrationBuilder.AddForeignKey(
                name: "FK_JobSeekerNotifications_Interviews_InterviewId1",
                table: "JobSeekerNotifications",
                column: "InterviewId1",
                principalTable: "Interviews",
                principalColumn: "Id");
        }
    }
}
