using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.src.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class NotificationsandInterviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmployerFeedback",
                table: "JobApplications");

            migrationBuilder.DropColumn(
                name: "InterviewNotes",
                table: "JobApplications");

            migrationBuilder.DropColumn(
                name: "InterviewScheduledDate",
                table: "JobApplications");

            migrationBuilder.CreateTable(
                name: "Interviews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    JobId = table.Column<int>(type: "integer", nullable: false),
                    JobSeekerId = table.Column<int>(type: "integer", nullable: false),
                    EmployerId = table.Column<int>(type: "integer", nullable: false),
                    InterViewLink = table.Column<string>(type: "text", nullable: false),
                    IsAccepted = table.Column<bool>(type: "boolean", nullable: false),
                    IsAttended = table.Column<bool>(type: "boolean", nullable: false),
                    IsCancelled = table.Column<bool>(type: "boolean", nullable: false),
                    InterviewScheduledDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    InterviewNotes = table.Column<string>(type: "text", nullable: true),
                    EmployerFeedback = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Interviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Interviews_Employers_EmployerId",
                        column: x => x.EmployerId,
                        principalTable: "Employers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Interviews_JobSeekers_JobSeekerId",
                        column: x => x.JobSeekerId,
                        principalTable: "JobSeekers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Interviews_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobSeekerNotifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    JobId = table.Column<int>(type: "integer", nullable: false),
                    JobSeekerId = table.Column<int>(type: "integer", nullable: false),
                    EmployerId = table.Column<int>(type: "integer", nullable: false),
                    ForStatus = table.Column<bool>(type: "boolean", nullable: false),
                    ForInterview = table.Column<bool>(type: "boolean", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: true),
                    InterviewId = table.Column<long>(type: "bigint", nullable: true),
                    InterviewId1 = table.Column<int>(type: "integer", nullable: true),
                    IsOpened = table.Column<bool>(type: "boolean", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobSeekerNotifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobSeekerNotifications_Employers_EmployerId",
                        column: x => x.EmployerId,
                        principalTable: "Employers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobSeekerNotifications_Interviews_InterviewId1",
                        column: x => x.InterviewId1,
                        principalTable: "Interviews",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_JobSeekerNotifications_JobSeekers_JobSeekerId",
                        column: x => x.JobSeekerId,
                        principalTable: "JobSeekers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobSeekerNotifications_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Interviews_EmployerId",
                table: "Interviews",
                column: "EmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_Interviews_JobId",
                table: "Interviews",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_Interviews_JobSeekerId",
                table: "Interviews",
                column: "JobSeekerId");

            migrationBuilder.CreateIndex(
                name: "IX_JobSeekerNotifications_EmployerId",
                table: "JobSeekerNotifications",
                column: "EmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_JobSeekerNotifications_InterviewId1",
                table: "JobSeekerNotifications",
                column: "InterviewId1");

            migrationBuilder.CreateIndex(
                name: "IX_JobSeekerNotifications_JobId",
                table: "JobSeekerNotifications",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_JobSeekerNotifications_JobSeekerId",
                table: "JobSeekerNotifications",
                column: "JobSeekerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobSeekerNotifications");

            migrationBuilder.DropTable(
                name: "Interviews");

            migrationBuilder.AddColumn<string>(
                name: "EmployerFeedback",
                table: "JobApplications",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InterviewNotes",
                table: "JobApplications",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "InterviewScheduledDate",
                table: "JobApplications",
                type: "timestamp with time zone",
                nullable: true);
        }
    }
}
