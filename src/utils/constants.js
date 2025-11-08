export const ROLES = {
  S_ADMIN: "super-admin",
  ADMIN: "admin",
  USER: "user",
};

export const SIZE = {
  1_10: "1-10",
  11_50: "11-50",
  51_100: "51-100",
  101_500: "101-500",
};

export const CATEGORIES = {
  TECH: "Technology",
  HEALTH: "Healthcare",
  FINANCE: "Finance",
  HR: "Hr",
  MARKETING: "Marketing",
  RETAIL: "Retail",
  ONLINE_SHOP: "OnlineShop",
  OTHER: "Other",
};

export const AVAILABLE_FUNCTIONS = [
  "User Management",
  "HR Management",
  "Finance Tracking",
  "Marketing Automation",
  "Inventory Control",
  "Client CRM",
  "Project Scheduling",
  "Reporting & Analytics",
  "Inventory Control",
];

export const FUNCTION_ROUTES = {
  USER_MANAGEMENT: {
    text: "usermanagement",
    path: "/biz-space/users",
  },
  HR_MANAGEMENT: {
    text: "hrmanagement",
    path: "/biz-space/hr",
    links: {
      employee: {
        text: "employeemanagement",
        path: "/biz-space/hr/employees",
      },
      attendance: {
        text: "attendances",
        path: "/biz-space/hr/attendances",
      },
      request: {
        text: "requests",
        path: "/biz-space/hr/requests",
      },
    },
  },
  FINANCE_TRACKING: {
    text: "financetracking",
    path: "/biz-space/finance",
    links: {
      payrolls: {
        text: "payrolls",
        path: "/biz-space/hr/payrolls",
      },
      invoices: {
        text: "invoices",
        path: "/biz-space/hr/invoices",
      },
    },
  },
  CLIENT_CRM: {
    text: "clientcrm",
    path: "/biz-space/crm",
  },
  PROJECT_SCHEDULING: {
    text: "projectscheduling",
    path: "/biz-space/projects",
    links: {
      all: {
        text: "allprojects",
        path: "/biz-space/projects/all",
      },
      milestones: {
        text: "milestones",
        path: "/biz-space/projects/milestones",
      },
    },
  },
  REPORTING_ANALYTICS: {
    text: "reportinganalytics",
    path: "/biz-space/reports",
  },
  MARKETING_AUTOMATION: {
    text: "marketingautomation",
    path: "/biz-space/marketing",
  },
  INVENTORY_CONTROL: {
    text: "inventorycontrol",
    path: "/biz-space/inventory",
  },
};
