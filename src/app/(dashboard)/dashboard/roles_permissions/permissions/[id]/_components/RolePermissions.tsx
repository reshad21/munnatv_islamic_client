"use client";

import React, { useState } from "react";
import { Save, X } from "lucide-react";
import Link from "next/link";

interface Permission {
  id: number;
  name: string;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

const INITIAL_PERMISSIONS: Permission[] = [
  { id: 1, name: "Dashboard", create: true, edit: true, delete: true },
  { id: 2, name: "Service", create: true, edit: true, delete: false },
  { id: 3, name: "Package", create: true, edit: false, delete: false },
  { id: 4, name: "Five Pillars Of Islam", create: false, edit: true, delete: true },
  { id: 5, name: "Contacts", create: true, edit: true, delete: true },
  { id: 6, name: "Gallery", create: false, edit: false, delete: false },
  { id: 7, name: "Reviews", create: true, edit: true, delete: false },
  { id: 8, name: "Blogs", create: true, edit: false, delete: true },
  { id: 9, name: "Roles", create: false, edit: true, delete: false },
  { id: 10, name: "Page Setting", create: true, edit: true, delete: true },
  { id: 11, name: "Update Profile", create: true, edit: true, delete: false },
];

interface RolePermissionsProps {
  roleId: number;
}

const RolePermissions = ({ roleId }: RolePermissionsProps) => {
  const [permissions, setPermissions] = useState<Permission[]>(INITIAL_PERMISSIONS);

  const togglePermission = (id: number, field: "create" | "edit" | "delete") => {
    setPermissions((prev) =>
      prev.map((permission) =>
        permission.id === id
          ? { ...permission, [field]: !permission[field] }
          : permission
      )
    );
  };

  const handleSave = () => {
    console.log("Saving permissions for role:", roleId);
    console.log("Permissions:", permissions);
    // Handle save logic
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left py-4 px-6 font-semibold text-gray-700">#</th>
            <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
            <th className="text-center py-4 px-6 font-semibold text-gray-700">Create</th>
            <th className="text-center py-4 px-6 font-semibold text-gray-700">Edit</th>
            <th className="text-center py-4 px-6 font-semibold text-gray-700">Delete</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {permissions.map((permission) => (
            <tr key={permission.id} className="border-b border-gray-50 hover:bg-gray-50/50">
              <td className="py-4 px-6 text-gray-600">{permission.id}</td>
              <td className="py-4 px-6 text-gray-700">{permission.name}</td>
              <td className="py-4 px-6 text-center">
                <input
                  type="checkbox"
                  checked={permission.create}
                  onChange={() => togglePermission(permission.id, "create")}
                  className="w-5 h-5 rounded border-gray-300 text-[#0f3d3e] focus:ring-[#0f3d3e] cursor-pointer accent-[#0f3d3e]"
                />
              </td>
              <td className="py-4 px-6 text-center">
                <input
                  type="checkbox"
                  checked={permission.edit}
                  onChange={() => togglePermission(permission.id, "edit")}
                  className="w-5 h-5 rounded border-gray-300 text-[#0f3d3e] focus:ring-[#0f3d3e] cursor-pointer accent-[#0f3d3e]"
                />
              </td>
              <td className="py-4 px-6 text-center">
                <input
                  type="checkbox"
                  checked={permission.delete}
                  onChange={() => togglePermission(permission.id, "delete")}
                  className="w-5 h-5 rounded border-gray-300 text-[#0f3d3e] focus:ring-[#0f3d3e] cursor-pointer accent-[#0f3d3e]"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Action Buttons */}
      <div className="flex gap-4 p-6 border-t border-gray-100">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#0f3d3e] text-white px-6 py-2 rounded-lg hover:bg-[#0f3d3e]/90 transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <Link
          href="/dashboard/roles_permissions"
          className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
          Close
        </Link>
      </div>
    </div>
  );
};

export default RolePermissions;
