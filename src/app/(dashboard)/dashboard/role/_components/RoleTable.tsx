import DashboardHeading from "@/components/shared/Dashboard/DashboardHeading";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { loggedUser } from "@/services/auth";
import { TRole } from "@/types/auth.types";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import DeleteRole from "./DeleteRole";
import GroupAvatar from "./GroupAvatar";
import GroupFeature from "./GroupFeature";

const roleTableHeaders: string[] = [
  "No",
  "Role Name",
  "Feature Access",
  "Assign Admins",
  "Actions",
];

const RoleTable = async ({ roles }: { roles: TRole[] }) => {
  const currentUser = await loggedUser();
  return (
    <div className="p-5 border shadow-sm rounded-md my-10">
      <div className="mb-5">
        <DashboardHeading
          heading="All Role"
          slogan={`You have received ${roles.length} roles`}
        />
      </div>
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[900px]">
          <TableCaption>
            {roles.length === 0 ? (
              <p className="text-gray-500">No roles found.</p>
            ) : (
              <p className="text-gray-500">A list of all roles received.</p>
            )}
          </TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              {roleTableHeaders.map((header) => (
                <TableHead
                  key={header}
                  className={`${
                    header === "Actions" ? "text-right" : ""
                  } font-medium`}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <GroupFeature role={item} />
                </TableCell>
                <TableCell>
                  <GroupAvatar users={item.adminUser} />
                </TableCell>
                <TableCell className="flex justify-end space-x-2">
                  <div className="flex space-x-2">
                    <Link
                      href={`/dashboard/role/${item.id}`}
                      className="text-green-600 hover:text-green-800"
                    >
                      <SquarePen size={18} />
                    </Link>
                    <DeleteRole
                      id={item.id}
                      role={item.name}
                      userRole={currentUser?.role}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RoleTable;
