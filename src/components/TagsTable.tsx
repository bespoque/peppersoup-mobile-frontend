
import React from 'react';
import { useTags } from "@/src/context/TagsContext";
;

const TagsTable: React.FC = () => {
  const { tags } = useTags();
 
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
      // second: '2-digit',
      hour12: true, 
    });
  };
  
  return (
    <div className="w-full p-4">
      <table className="min-w-full mt-6 bg-white">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="px-6 py-3">Tag</th>
            <th className="px-6 py-3">Created time</th>
            <th className="px-6 py-3">Updated time</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag, index) => (
            <tr key={index} className="text-left bg-white border-b">
              <td className="px-6 py-4">{tag.name}</td>
              <td className="px-6 py-4">{formatDate(tag.created_at)}</td>
              <td className="px-6 py-4">{formatDate(tag.updated_at)}</td>
              <td className="px-6 py-4 text-blue-600 cursor-pointer">View</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TagsTable;
