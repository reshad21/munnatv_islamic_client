"use client";

import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import { Pencil, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { updateBlogStatus } from "@/services/blog";
import DeleteBlogDialog from "./DeleteBlogDialog";
import stripHtmlTags from "@/utils/stripHtmlTags";


interface Blog {
  id: string;
  image: string;
  title: string;
  description: string;
  status: boolean;
}

const BlogsTable = ({ blogs }: { blogs: Blog[] }) => {
  const handleStatusChange = async (blog: Blog) => {
    const res = await updateBlogStatus(blog.id, !blog.status);
    if (res.statusCode === 200) {
      showSuccessToast(
        `Blog ${!blog.status ? "activated" : "deactivated"} successfully`
      );
    } else {
      showErrorToast(res.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                SN
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Image
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Title
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Description
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {blogs?.length > 0 ? blogs?.map((blog, idx) => (
              <tr
                key={blog.id}
                className="border-b border-gray-50 hover:bg-gray-50/50"
              >
                <td className="py-4 px-6 text-gray-600">{idx + 1}</td>
                <td className="py-4 px-6">
                  <div className="w-14 h-14 rounded-lg overflow-hidden relative">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-700">{blog.title}</td>
                <td className="py-4 px-6 text-gray-600 max-w-xs">
                  {/* Show only first 30 letters of description, then ... */}
                  {(() => {
                    const text = stripHtmlTags(blog.description || "");
                    return text.length > 30 ? text.slice(0, 30) + '...' : text;
                  })()}
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleStatusChange(blog)}
                    className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${blog.status ? "bg-[#0f3d3e]" : "bg-gray-300"
                      }`}
                    aria-pressed={blog.status}
                    aria-label={blog.status ? "Active" : "Inactive"}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${blog.status ? "right-1" : "left-1"
                        }`}
                    />
                  </button>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/blogs/edit/${blog.id}`}
                      className="w-8 h-8 flex items-center justify-center border border-[#0f3d3e] text-[#0f3d3e] rounded hover:bg-[#0f3d3e] hover:text-white transition-colors cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <DeleteBlogDialog id={blog.id} />
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BlogsTable;
