module.exports = {
    development: {
      client: 'mysql',
      connection: {
        host: 'localhost',
        user: 'root', // Assuming you are using the root user
        password: '', // Empty password for the root user
        database: 'students_db', // Change this to your database name
      },
      migrations: {
        directory: './migrations',
      },
    },
  
    // Add other environments as needed (e.g., production, testing)
  };
  