import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/makeithome');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

async function listAdmins() {
  try {
    const admins = await User.find({ role: 'admin' }).select('username role createdAt');
    console.log('\n📋 Current Admin Users:');
    console.log('========================');
    if (admins.length === 0) {
      console.log('No admin users found.');
    } else {
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. Username: ${admin.username}`);
        console.log(`   Role: ${admin.role}`);
        console.log(`   Created: ${admin.createdAt.toLocaleDateString()}`);
        console.log(`   ID: ${admin._id}`);
        console.log('   ---');
      });
    }
    return admins;
  } catch (error) {
    console.error('❌ Error listing admins:', error);
    return [];
  }
}

async function createAdmin(username, password) {
  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`❌ Username "${username}" already exists!`);
      return false;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = new User({
      username,
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log(`✅ Admin user "${username}" created successfully!`);
    console.log(`   Username: ${username}`);
    console.log(`   Password: ${password}`);
    console.log(`   Role: admin`);
    return true;
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    return false;
  }
}

async function deleteAdmin(username) {
  try {
    const admin = await User.findOne({ username, role: 'admin' });
    if (!admin) {
      console.log(`❌ Admin user "${username}" not found!`);
      return false;
    }

    await User.deleteOne({ username, role: 'admin' });
    console.log(`✅ Admin user "${username}" deleted successfully!`);
    return true;
  } catch (error) {
    console.error('❌ Error deleting admin:', error);
    return false;
  }
}

async function changePassword(username, newPassword) {
  try {
    const admin = await User.findOne({ username, role: 'admin' });
    if (!admin) {
      console.log(`❌ Admin user "${username}" not found!`);
      return false;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne(
      { username, role: 'admin' },
      { password: hashedPassword }
    );

    console.log(`✅ Password changed for admin user "${username}"!`);
    console.log(`   New Password: ${newPassword}`);
    return true;
  } catch (error) {
    console.error('❌ Error changing password:', error);
    return false;
  }
}

async function main() {
  await connectDB();

  const args = process.argv.slice(2);
  const command = args[0];

  console.log('\n🔐 Admin User Management Tool');
  console.log('==============================');

  switch (command) {
    case 'list':
      await listAdmins();
      break;

    case 'create':
      const username = args[1];
      const password = args[2];
      if (!username || !password) {
        console.log('❌ Usage: npm run manage-admins create <username> <password>');
        console.log('   Example: npm run manage-admins create newadmin mypassword123');
      } else {
        await createAdmin(username, password);
      }
      break;

    case 'delete':
      const deleteUsername = args[1];
      if (!deleteUsername) {
        console.log('❌ Usage: npm run manage-admins delete <username>');
        console.log('   Example: npm run manage-admins delete oldadmin');
      } else {
        // Safety check - list admins first
        const admins = await listAdmins();
        if (admins.length <= 1) {
          console.log('⚠️  Warning: This is the only admin user. Deletion cancelled for safety.');
        } else {
          await deleteAdmin(deleteUsername);
        }
      }
      break;

    case 'password':
      const changeUsername = args[1];
      const newPassword = args[2];
      if (!changeUsername || !newPassword) {
        console.log('❌ Usage: npm run manage-admins password <username> <newpassword>');
        console.log('   Example: npm run manage-admins password admin newpassword123');
      } else {
        await changePassword(changeUsername, newPassword);
      }
      break;

    default:
      console.log('📖 Available Commands:');
      console.log('   list                           - List all admin users');
      console.log('   create <username> <password>   - Create new admin user');
      console.log('   delete <username>              - Delete admin user');
      console.log('   password <username> <password> - Change admin password');
      console.log('');
      console.log('📝 Examples:');
      console.log('   npm run manage-admins list');
      console.log('   npm run manage-admins create chris mypassword123');
      console.log('   npm run manage-admins delete admin');
      console.log('   npm run manage-admins password chris newpassword456');
      break;
  }

  process.exit(0);
}

main().catch(error => {
  console.error('❌ Script error:', error);
  process.exit(1);
});
