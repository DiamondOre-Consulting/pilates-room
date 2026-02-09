import mongoose from 'mongoose';
import { config } from 'dotenv';
import Order from './models/order.model.js';
import path from 'path';

config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const orderCount = await Order.countDocuments({});
    console.log(`Total Orders: ${orderCount}`);
    
    // Check for memberships
    const User = (await import('./models/user.model.js')).default;
    const usersWithMemberships = await User.find({
        $or: [
            { isDiscovery: true },
            { isMember: true }
        ]
    });
    
    console.log(`Users with memberships: ${usersWithMemberships.length}`);
    if (usersWithMemberships.length > 0) {
        console.log("Sample user:", JSON.stringify(usersWithMemberships[0], null, 2));
    }


  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
};

run();
