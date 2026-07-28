const getAdminMetrics = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      metrics: {
        totalUsers: 14820,
        activeSubscriptions: 3410,
        monthlyRecurringRevenue: 34090,
        totalFilesProcessed: 1290450,
        serverCpuUsage: '14%',
        serverMemoryUsage: '38%',
        storageTotalTb: 4.8,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUsersList = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      users: [
        { id: 'usr_1', name: 'Suraj Vishwakarma', email: 'suraj@pdfmasterpro.com', role: 'ADMIN', plan: 'Enterprise', status: 'ACTIVE' },
        { id: 'usr_2', name: 'Alex Morgan', email: 'alex@enterprise.com', role: 'USER', plan: 'Pro', status: 'ACTIVE' },
        { id: 'usr_3', name: 'Sophia Chen', email: 'sophia@techcorp.io', role: 'STAFF', plan: 'Enterprise', status: 'ACTIVE' },
        { id: 'usr_4', name: 'Marcus Vance', email: 'marcus@startup.co', role: 'USER', plan: 'Free', status: 'SUSPENDED' },
      ],
    });
  } catch (error) {
    next(error);
  }
};

const getSystemLogs = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      logs: [
        { id: 'log_1', type: 'INFO', message: 'Database backup completed successfully', timestamp: '2026-07-28 04:00:00' },
        { id: 'log_2', type: 'WARN', message: 'High request rate detected from IP 192.168.1.45', timestamp: '2026-07-28 08:12:33' },
        { id: 'log_3', type: 'INFO', message: 'Stripe Webhook processed event invoice.payment_succeeded', timestamp: '2026-07-28 09:44:10' },
      ],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminMetrics,
  getUsersList,
  getSystemLogs,
};
