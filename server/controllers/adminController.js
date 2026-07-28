// PDFMaster Pro Admin Controller
// Developed by Suraj Vishwakarma

let mockUsersList = [
  { id: 'usr_1', name: 'Suraj Vishwakarma', email: 'suraj@pdfmasterpro.com', role: 'ADMIN', plan: 'Enterprise', status: 'ACTIVE', provider: 'credentials', device: 'Windows 11 Chrome', ip: '192.168.1.1', createdAt: '2026-01-01' },
  { id: 'usr_2', name: 'Alex Morgan', email: 'alex@enterprise.com', role: 'USER', plan: 'Pro', status: 'ACTIVE', provider: 'google', device: 'macOS Safari', ip: '10.0.0.42', createdAt: '2026-02-15' },
  { id: 'usr_3', name: 'Sophia Chen', email: 'sophia@techcorp.io', role: 'STAFF', plan: 'Enterprise', status: 'ACTIVE', provider: 'github', device: 'Linux Firefox', ip: '172.16.0.5', createdAt: '2026-03-20' },
  { id: 'usr_4', name: 'Marcus Vance', email: 'marcus@startup.co', role: 'USER', plan: 'Free', status: 'BLOCKED', provider: 'credentials', device: 'Android Edge', ip: '192.168.1.99', createdAt: '2026-05-10' },
];

const mockAuditLogs = [
  { id: 'log_101', type: 'LOGIN_SUCCESS', user: 'suraj@pdfmasterpro.com', provider: 'Email OTP', ip: '192.168.1.1', device: 'Windows 11 Chrome', timestamp: '2026-07-28 11:45:10' },
  { id: 'log_102', type: 'OTP_SENT', user: 'itxsurajofficial@gmail.com', provider: 'SMTP Gmail', ip: '192.168.1.1', device: 'Windows 11 Chrome', timestamp: '2026-07-28 11:40:02' },
  { id: 'log_103', type: 'OAUTH_LOGIN', user: 'alex@enterprise.com', provider: 'Google OAuth', ip: '10.0.0.42', device: 'macOS Safari', timestamp: '2026-07-28 10:15:30' },
  { id: 'log_104', type: 'LOGOUT_ALL', user: 'marcus@startup.co', provider: 'Session Revoke', ip: '192.168.1.99', device: 'Android Edge', timestamp: '2026-07-27 18:22:45' },
];

// GET /api/admin/metrics
exports.getAdminMetrics = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      metrics: {
        totalUsers: mockUsersList.length + 14816,
        newRegistrationsToday: 42,
        activeSubscriptions: 3410,
        otpLogsCount: mockAuditLogs.length,
        serverCpuUsage: '14%',
        serverMemoryUsage: '38%',
        storageTotalTb: 4.8,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/users
exports.getUsersList = async (req, res, next) => {
  try {
    const { search, role, status } = req.query;
    let filtered = [...mockUsersList];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    if (role) {
      filtered = filtered.filter(u => u.role === role);
    }
    if (status) {
      filtered = filtered.filter(u => u.status === status);
    }

    return res.status(200).json({
      success: true,
      totalUsers: filtered.length,
      users: filtered,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/logs
exports.getSystemLogs = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      logs: mockAuditLogs,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/admin/user/:id
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    mockUsersList = mockUsersList.filter(u => u.id !== id);
    return res.status(200).json({
      success: true,
      message: `User ${id} permanently deleted.`,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/admin/user/:id/status (Block / Unblock / Role Update)
exports.updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, role } = req.body;

    mockUsersList = mockUsersList.map(u => {
      if (u.id === id) {
        return {
          ...u,
          status: status || u.status,
          role: role || u.role,
        };
      }
      return u;
    });

    return res.status(200).json({
      success: true,
      message: `User ${id} status updated successfully.`,
      users: mockUsersList,
    });
  } catch (error) {
    next(error);
  }
};
