import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  const connectionStrings = [
    'mongodb://localhost:27017/makeithome',
    'mongodb://127.0.0.1:27017/makeithome',
    'mongodb://localhost:27017',
    'mongodb://127.0.0.1:27017'
  ];

  for (const uri of connectionStrings) {
    try {
      console.log(`\n🔄 Trying to connect to: ${uri}`);
      
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000, // 5 second timeout
        connectTimeoutMS: 5000
      });
      
      console.log('✅ Successfully connected to MongoDB!');
      
      // Test database operations
      const admin = mongoose.connection.db.admin();
      const result = await admin.listDatabases();
      console.log('Available databases:', result.databases.map(db => db.name));
      
      await mongoose.disconnect();
      console.log('✅ Connection test passed!');
      process.exit(0);
      
    } catch (error) {
      console.error(`❌ Failed to connect to ${uri}`);
      console.error(`Error: ${error.message}`);
      
      // Disconnect if partially connected
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }
    }
  }
  
  console.error('\n❌ All connection attempts failed!');
  console.error('MongoDB might not be running or installed properly.');
  process.exit(1);
}

testConnection();
