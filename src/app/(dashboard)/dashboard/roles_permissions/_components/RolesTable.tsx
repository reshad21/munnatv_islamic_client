"use client";

import { Pencil, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DeleteAdminUserDialog from "./DeleteAdminUserDialog";

interface Role {
  id: string;
  name: string;
  status: string;
}

interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  profilePhoto: string;
  roleId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  role?: Role;
}

interface RolesTableProps {
  rolesData: AdminUser[];
}

const RolesTable = ({ rolesData = [] }: RolesTableProps) => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(rolesData);
  const toggleStatus = (id: string) => {
    setAdminUsers((prev) =>
      prev.map((user) =>
        user.id === id 
          ? { ...user, status: user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" } 
          : user
      )
    );
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Admin Users</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage admin users and their role permissions
          </p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left py-4 px-6 font-semibold text-gray-700">SN</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Profile</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Email</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Role</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {adminUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No admin users found
                </td>
              </tr>
            ) : (
              adminUsers.map((user, index) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-6 text-gray-600">{index + 1}</td>
                  <td className="py-4 px-6">
                    <div className="w-10 h-10 rounded-full bg-[#0f3d3e] flex items-center justify-center overflow-hidden">
                      {user.profilePhoto ? (
                        <Image 
                          src={user.profilePhoto} 
                          alt={user.fullName}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700 font-medium">{user.fullName}</td>
                  <td className="py-4 px-6 text-gray-600">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0f3d3e]/10 text-[#0f3d3e]">
                      {user.role?.name || "No Role"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${
                        user.status === "ACTIVE" ? "bg-[#0f3d3e]" : "bg-gray-300"
                      }`}
                    >
                      <span 
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          user.status === "ACTIVE" ? "right-1" : "left-1"
                        }`} 
                      />
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/roles_permissions/edit/${user.id}`}
                        className="w-8 h-8 flex items-center justify-center border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition-colors cursor-pointer"
                        title="Edit admin user"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteAdminUserDialog id={user.id} name={user.fullName} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RolesTable;