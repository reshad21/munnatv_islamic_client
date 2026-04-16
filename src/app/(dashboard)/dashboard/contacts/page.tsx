import React from "react";
import { DashboardWrapper } from "../_components/DashboardWrapper";
import ContactsTable from "./_components/ContactsTable";
import { getContacts } from "@/services/contacts";
import { TQuery } from "@/types/query.types";
import PaginationWrapper from "@/components/shared/PaginationWrapper";

const ContactPage = async (props: { searchParams: Promise<{ search: string; page: string }> }) => {
  const searchParams = await props.searchParams;
  const search = searchParams.search || "";
  const page = parseInt(searchParams.page) || 1;
  const query: TQuery[] = [
    { key: "orderBy", value: JSON.stringify({ createdAt: "desc" }) },
    { key: "searchTerm", value: search },
    { key: "page", value: page.toString() },
    { key: "limit", value: "10" },
  ];
  const contactsData = await getContacts(query);
  return (
    <DashboardWrapper>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Contacts</h2>
        
      </div>
      <ContactsTable contactsData={contactsData?.data || []} />
      {contactsData?.meta?.totalPages > 1 && (
        <PaginationWrapper
          active={page}
          totalPages={contactsData?.meta?.totalPages || 1}
          totalItems={contactsData?.meta?.totalItems || 0}
        />
      )}
    </DashboardWrapper>
  );
};

export default ContactPage;
