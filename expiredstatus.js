const cron = require('node-cron');
const Order = require('./models/order'); // Import your Order model

cron.schedule('0 * * * *', async () => {
  try {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000); // Calculate 2 hours ago
    const ordersToUpdate = await Order.findAll({
      where: {
        status: 'pending', // Filter for pending orders
        updatedAt: { [Sequelize.Op.lt]: twoHoursAgo }
      }
    });

    if (ordersToUpdate.length > 0) {
      // Update orders' status to expired
      await Promise.all(
        ordersToUpdate.map(async (order) => {
          order.status = 'expired';
          await order.save();
        })
      );
      console.log('Orders updated successfully.');
    } else {
      console.log('No orders to update.');
    }
  } catch (error) {
    console.error('Error occurred during order status update:', error);
  }
});
