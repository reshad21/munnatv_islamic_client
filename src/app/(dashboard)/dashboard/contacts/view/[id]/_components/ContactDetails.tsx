import React from "react";
import { getContactById } from "@/services/contacts";

interface ContactDetailsProps {
  contactId: string;
}


export default async function ContactDetails({ contactId }: ContactDetailsProps) {
  const res = await getContactById(contactId);
  const contact = res?.data;

  if (!contact) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <p className="text-sm text-red-600">Contact not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      {/* Row 1: Full Name, Email, Phone, Country */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-1">Full Name</h3>
          <p className="text-sm text-gray-600">{contact.fullName}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-1">Email</h3>
          <p className="text-sm text-gray-600">{contact.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-1">Phone</h3>
          <p className="text-sm text-gray-600">{contact.phone}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-1">Country</h3>
          <p className="text-sm text-gray-600">{contact.country || '-'}</p>
        </div>
      </div>

      {/* Subject */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-1">Subject</h3>
        <p className="text-sm text-gray-600">{contact.subject}</p>
      </div>

      {/* Message */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-1">Message</h3>
        <p className="text-sm text-gray-600">{contact.message}</p>
      </div>
    </div>
  );
}