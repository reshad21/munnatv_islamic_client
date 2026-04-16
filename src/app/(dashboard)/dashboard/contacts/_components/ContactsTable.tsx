"use client";

import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import DeleteContactsDialog from "./DeleteContacts";

interface Contact {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country?: string;
  subject: string;
  message: string;
}

interface ContactsTableProps {
  contactsData: Contact[];
}

const ContactsTable = ({ contactsData }: ContactsTableProps) => {
  const [contacts, setContacts] = useState<Contact[]>(contactsData);

  useEffect(() => {
    setContacts(contactsData);
  }, [contactsData]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">SN</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Full Name</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Email</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Phone</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Country</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Subject</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Message</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 px-6 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              ) : (
                contacts.map((contact, idx) => (
                  <tr key={contact.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-4 px-6 text-gray-600 whitespace-nowrap">{idx + 1}</td>
                    <td className="py-4 px-6 text-gray-700 whitespace-nowrap">{contact.fullName}</td>
                    <td className="py-4 px-6 text-[#0f3d3e] whitespace-nowrap">{contact.email}</td>
                    <td className="py-4 px-6 text-gray-600 whitespace-nowrap">{contact.phone}</td>
                    <td className="py-4 px-6 text-gray-600 whitespace-nowrap">{contact.country || '-'}</td>
                    <td className="py-4 px-6 text-gray-700 whitespace-nowrap">{contact.subject}</td>
                    <td className="py-4 px-6 text-gray-600">
                      <p className="line-clamp-2 min-w-[150px] max-w-xs">
                        {contact.message.length > 10
                          ? `${contact.message.slice(0, 10)}...`
                          : contact.message}
                      </p>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/contacts/view/${contact.id}`}
                          className="w-8 h-8 flex items-center justify-center border border-[#0f3d3e] text-[#0f3d3e] rounded hover:bg-[#0f3d3e] hover:text-white transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <DeleteContactsDialog id={contact.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ContactsTable;