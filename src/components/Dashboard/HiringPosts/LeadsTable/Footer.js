import { Icons } from '@utils/constantData/icons';
import {
  priorityConfig,
  statusConfig,
} from '@utils/constantData/leadsFunctions/tabsFuncitons';

const TableFooter = ({ dataToUse }) => {
  // Calculate all statistics
  const stats = {
    // Status counts
    statusCounts: Object.entries(statusConfig).reduce(
      (acc, [status, config]) => {
        const count = dataToUse.filter((p) => p.leadStatus === status).length;
        if (count > 0) acc[status] = { count, config };
        return acc;
      },
      {},
    ),

    // Priority counts
    priorityCounts: Object.entries(priorityConfig).reduce(
      (acc, [priority, config]) => {
        const count = dataToUse.filter(
          (p) => p.leadPriority === priority,
        ).length;
        if (count > 0) acc[priority] = { count, config };
        return acc;
      },
      {},
    ),

    // Automation stats
    automationStats: {
      none: dataToUse.filter((p) => p.automationEnabled === 'none').length,
      semi: dataToUse.filter((p) => p.automationEnabled === 'semi').length,
      full: dataToUse.filter((p) => p.automationEnabled === 'full').length,
      emailEnabled: dataToUse.filter((p) => p.generateEmail === true).length,
      linkedInEnabled: dataToUse.filter(
        (p) => p.generateLinkedInMessage === true,
      ).length,
      autoFollowUp: dataToUse.filter((p) => p.autoFollowUp === true).length,
    },


    // Contact information
    contactInfo: {
      withEmail: dataToUse.filter(
        (p) => p.emailAddresses && p.emailAddresses.length > 0,
      ).length,
      withFormLinks: dataToUse.filter(
        (p) => p.formLinks && p.formLinks.length > 0,
      ).length,
      withBudget: dataToUse.filter((p) => p.budget && p.budget.trim() !== '')
        .length,
    },

    // Time-based stats
    timeStats: {
      contacted: dataToUse.filter((p) => p.lastContactedAt).length,
      followUpDue: dataToUse.filter(
        (p) => p.followUpDate && new Date(p.followUpDate) <= new Date(),
      ).length,
      automationDue: dataToUse.filter(
        (p) =>
          p.nextAutomationDate && new Date(p.nextAutomationDate) <= new Date(),
      ).length,
    },

    // Categories and tags
    categories: [...new Set(dataToUse.map((p) => p.category || 'general'))]
      .length,
    totalTags: [...new Set(dataToUse.flatMap((p) => p.tags || []))].length,
    industries: [...new Set(dataToUse.map((p) => p.industry).filter(Boolean))]
      .length,

    // General stats
    total: dataToUse.length,
    active: dataToUse.filter((p) => p.isActive !== false).length,
    withNotes: dataToUse.filter((p) => p.notes && p.notes.trim() !== '').length,
    withCampaign: dataToUse.filter(
      (p) => p.campaignId && p.campaignId.trim() !== '',
    ).length,
  };

  const StatItem = ({ icon, value, label, color = '#6B7280' }) => (
    <div className="flex items-center gap-1.5">
      {icon && (
        <span style={{ color }} className="text-xs">
          {icon}
        </span>
      )}
      <span className="font-medium" style={{ color }}>
        {value}
      </span>
      <span className="text-gray-500">{label}</span>
    </div>
  );

  const StatusBadge = ({ status, count, config }) => (
    <div className="flex items-center gap-1.5">
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: config.color }}
      />
      <span className="font-medium">{count}</span>
      <span className="text-gray-500">{config.label}</span>
    </div>
  );

  const PriorityBadge = ({ priority, count, config }) => (
    <div className="flex items-center gap-1.5">
      <Icons.Flag style={{ color: config.color }} className="w-2.5 h-2.5" />
      <span className="font-medium">{count}</span>
      <span className="text-gray-500">{config.label}</span>
    </div>
  );

  return (
    <div className="px-6 py-4 bg-white border-y border-b-gray-200">
      <div className="space-y-3">
        {/* Row 1: Status and Priority */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            {Object.entries(stats.statusCounts).map(
              ([status, { count, config }]) => (
                <StatusBadge
                  key={status}
                  status={status}
                  count={count}
                  config={config}
                />
              ),
            )}
          </div>
          <div className="flex items-center gap-6">
            {Object.entries(stats.priorityCounts).map(
              ([priority, { count, config }]) => (
                <PriorityBadge
                  key={priority}
                  priority={priority}
                  count={count}
                  config={config}
                />
              ),
            )}
          </div>
        </div>

        {/* Row 2: Automation Stats */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            {stats.automationStats.full > 0 && (
              <StatItem
                icon="🤖"
                value={stats.automationStats.full}
                label="Full Auto"
                color="#10B981"
              />
            )}
            {stats.automationStats.semi > 0 && (
              <StatItem
                icon="⚡"
                value={stats.automationStats.semi}
                label="Semi Auto"
                color="#F59E0B"
              />
            )}
          </div>
          <div className="flex items-center gap-6">
            {stats.timeStats.followUpDue > 0 && (
              <StatItem
                icon="⏰"
                value={stats.timeStats.followUpDue}
                label="Follow-up Due"
                color="#EF4444"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableFooter;
