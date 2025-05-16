import cron from 'node-cron'
import User from '../models/user.model.js'

cron.schedule('0 0 * * *',async()=>{
    

    console.log('Running daily membership expiration check...');
    const now = new Date();  
    await User.updateMany(
      {
        'memberShipPlan.expiryDate': { $lt: now },
        'memberShipPlan.status': 'active'
      },
      {
        $set:{
        'memberShipPlan': {
            registrationDate: null,
            expiryDate: null,
            startDate: null,
            remainingSession: 0,
            package: null,
            status: 'expired',
            subscriptionId: null
        }
      }
      }
    );
  
    console.log('Membership expiration update complete.');

});