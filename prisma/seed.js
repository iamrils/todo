const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // Create a test user
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
      password: hashedPassword,
    },
  });

  // Create 20+ sample todos
  const todos = [
    {
      title: "Complete project documentation",
      description: "Write comprehensive docs for the project",
    },
    {
      title: "Review pull requests",
      description: "Review and approve pending PRs",
    },
    {
      title: "Update dependencies",
      description: "Update all npm packages to latest versions",
    },
    {
      title: "Write unit tests",
      description: "Add tests for authentication module",
    },
    {
      title: "Fix bug in todo form",
      description: "Form validation is not working correctly",
    },
    {
      title: "Optimize database queries",
      description: "Add proper indexes to improve performance",
    },
    {
      title: "Setup CI/CD pipeline",
      description: "Configure GitHub Actions for automated testing",
    },
    {
      title: "Create user guide",
      description: "Write user guide for the application",
    },
    {
      title: "Setup monitoring",
      description: "Add application monitoring and alerting",
    },
    {
      title: "Database migration",
      description: "Migrate from SQLite to PostgreSQL",
    },
    {
      title: "Refactor authentication code",
      description: "Clean up auth module and add error handling",
    },
    {
      title: "Add dark mode support",
      description: "Implement dark mode toggle in UI",
    },
    {
      title: "Setup email notifications",
      description: "Configure email service for notifications",
    },
    {
      title: "Create API documentation",
      description: "Document all API endpoints with examples",
    },
    {
      title: "Add file upload feature",
      description: "Allow users to attach files to todos",
    },
    {
      title: "Implement caching",
      description: "Add Redis caching layer for better performance",
    },
    {
      title: "Security audit",
      description: "Conduct security review of the application",
    },
    {
      title: "Performance testing",
      description: "Run load tests and optimize bottlenecks",
    },
    {
      title: "User feedback session",
      description: "Gather feedback from beta users",
    },
    {
      title: "Deploy to production",
      description: "Deploy application to production environment",
    },
    {
      title: "Backup strategy",
      description: "Setup automated backups for the database",
    },
    {
      title: "Analytics integration",
      description: "Add Google Analytics to track user behavior",
    },
  ];

  for (const todoData of todos) {
    await prisma.todo.create({
      data: {
        ...todoData,
        userId: user.id,
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
