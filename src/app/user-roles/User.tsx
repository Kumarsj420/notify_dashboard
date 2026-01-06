"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Shield,
  X,
} from "lucide-react";

import Button from "@/components/Button";
import InfoCard from "@/components/InfoCard";

import { ShieldCheckIcon } from "@heroicons/react/24/outline";

/* =======================
   Types
======================= */
type UserStatus = "Active" | "Inactive";

type UserType = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  lastActive: string;
};

type RoleCardType = {
  id: number;
  name: string;
  users: number;
  permissions: string;
  variant: "error" | "info" | "success" | "warning";
};

type RoleType = {
  id: number;
  name: string;
  users: number;
  permissions: string;
  color: string;
};

/* =======================
   Component
======================= */
const User = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [activeTab, setActiveTab] = useState<"users" | "roles" | "permissions">(
    "users"
  );

  /* =======================
     Static Data
  ======================= */
  const roles: RoleType[] = [
    { id: 1, name: "Admin", users: 3, permissions: "Full Access", color: "bg-purple-500" },
    { id: 2, name: "Manager", users: 8, permissions: "Read & Write", color: "bg-blue-500" },
    { id: 3, name: "Analyst", users: 15, permissions: "Read Only", color: "bg-green-500" },
    { id: 4, name: "Viewer", users: 24, permissions: "Limited Read", color: "bg-gray-500" },
  ];

  const roles_type: RoleCardType[] = [
    { id: 1, name: "Admin", users: 3, permissions: "Full Access", variant: "error" },
    { id: 2, name: "Manager", users: 8, permissions: "Read & Write", variant: "info" },
    { id: 3, name: "Analyst", users: 15, permissions: "Read Only", variant: "success" },
    { id: 4, name: "Viewer", users: 24, permissions: "Limited Read", variant: "warning" },
  ];

  const users: UserType[] = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@company.com",
      role: "Admin",
      status: "Active",
      lastActive: "2 mins ago",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      role: "Manager",
      status: "Active",
      lastActive: "15 mins ago",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@company.com",
      role: "Analyst",
      status: "Active",
      lastActive: "1 hour ago",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@company.com",
      role: "Manager",
      status: "Active",
      lastActive: "3 hours ago",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.w@company.com",
      role: "Analyst",
      status: "Inactive",
      lastActive: "2 days ago",
    },
    {
      id: 6,
      name: "Lisa Anderson",
      email: "lisa.a@company.com",
      role: "Viewer",
      status: "Active",
      lastActive: "5 mins ago",
    },
  ];

  const permissions = [
    { category: "Assets", items: ["View Assets", "Add Assets", "Edit Assets", "Delete Assets"] },
    { category: "Monitoring", items: ["View Alerts", "Configure Monitoring", "Manage Rules"] },
    { category: "Reports", items: ["View Reports", "Generate Reports", "Export Data"] },
    { category: "Users", items: ["View Users", "Add Users", "Edit Users", "Delete Users"] },
    { category: "Settings", items: ["View Settings", "Edit Settings", "Manage Integrations"] },
  ];

  /* =======================
     Handlers
  ======================= */
  const handleEditUser = (user: UserType) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  /* =======================
     Render
  ======================= */
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User roles</h1>
            <p className="text-gray-600 mt-1">
              Manage user access and permissions
            </p>
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-5 h-5" />
            Add User
          </Button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {roles_type.map((role) => (
            <InfoCard
              key={role.id}
              title={role.name}
              value={role.users}
              icon={<ShieldCheckIcon className="size-6" />}
              iconVariant={role.variant}
              message={role.permissions}
              messageVariant={role.variant}
            />
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["users", "roles", "permissions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                placeholder={`Search ${activeTab}...`}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    {["Name", "Email", "Role", "Status", "Last Active"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase"
                        >
                          {h}
                        </th>
                      )
                    )}
                    <th className="w-12" />
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium">
                        {user.name}
                      </td>
                      <td className="py-4 px-4">{user.email}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">{user.lastActive}</td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Roles Tab */}
          {activeTab === "roles" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roles.map((role) => (
                <div key={role.id} className="p-6 bg-gray-50 rounded-xl border">
                  <div
                    className={`w-12 h-12 ${role.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <Shield className="text-white" />
                  </div>
                  <h3 className="font-bold">{role.name}</h3>
                  <p className="text-sm text-gray-600">
                    {role.permissions}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Permissions Tab */}
          {activeTab === "permissions" && (
            <div className="space-y-6">
              {permissions.map((perm) => (
                <div key={perm.category} className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-bold mb-4">{perm.category}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {perm.items.map((item) => (
                      <label key={item} className="flex gap-2 items-center">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6 border-b flex justify-between">
              <h2 className="font-bold">Edit User</h2>
              <button onClick={() => setShowEditModal(false)}>
                <X />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <input
                defaultValue={selectedUser.name}
                className="w-full p-2 border rounded"
              />
              <input
                defaultValue={selectedUser.email}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
