const getProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: {
        id: req.user ? req.user.id : 'usr_123',
        name: 'Suraj Vishwakarma',
        email: 'suraj@pdfmasterpro.com',
        role: 'ADMIN',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        plan: 'Pro Professional',
        storageUsedBytes: 1245000000,
        storageLimitBytes: 10737418240, // 10 GB
      },
    });
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      stats: {
        totalFilesProcessed: 148,
        storageUsedGb: 1.25,
        storageLimitGb: 10,
        favoriteCount: 12,
        activePlan: 'Pro Plan',
        recentActivity: [
          { id: 1, tool: 'Merge PDF', file: 'Q3_Financial_Reports.pdf', date: '2026-07-28 10:15' },
          { id: 2, tool: 'AI Summary', file: 'Contract_Agreement_v2.pdf', date: '2026-07-27 16:40' },
          { id: 3, tool: 'Compress PDF', file: 'Marketing_Presentation.pdf', date: '2026-07-26 11:20' },
          { id: 4, tool: 'Watermark PDF', file: 'Project_Design_Brief.pdf', date: '2026-07-25 09:05' },
        ],
      },
    });
  } catch (error) {
    next(error);
  }
};

const getFiles = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      files: [
        { id: 'f1', name: 'Annual_Report_2026.pdf', size: '3.4 MB', pages: 28, isFavorite: true, createdAt: '2026-07-28' },
        { id: 'f2', name: 'Invoice_OCT_9921.pdf', size: '512 KB', pages: 2, isFavorite: false, createdAt: '2026-07-27' },
        { id: 'f3', name: 'Software_Architecture_Doc.pdf', size: '12.8 MB', pages: 64, isFavorite: true, createdAt: '2026-07-25' },
      ],
    });
  } catch (error) {
    next(error);
  }
};

const getApiTokens = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      tokens: [
        { id: 'tk_1', name: 'Production Backend Key', prefix: 'pdf_live_9921...', createdAt: '2026-06-01', lastUsed: '2026-07-28' },
        { id: 'tk_2', name: 'Staging Environment Key', prefix: 'pdf_test_8812...', createdAt: '2026-07-15', lastUsed: '2026-07-20' },
      ],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  getDashboardStats,
  getFiles,
  getApiTokens,
};
