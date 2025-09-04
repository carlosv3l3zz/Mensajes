import React from "react";
import type { User } from "@/lib/types/Messages";

interface MentionDropdownProps {
  users: User[];
  searchTerm: string;
  onSelectUser: (user: User) => void;
}

const MentionDropdown: React.FC<MentionDropdownProps> = ({ 
  users, 
  searchTerm, 
  onSelectUser 
}) => {
  const filteredUsers = users.filter((user) => {
    if (!searchTerm) return true; // Mostrar todos si no hay término de búsqueda
    const userName = user.name.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    // Buscar por nombre completo o por palabras individuales
    return (
      userName.includes(searchTermLower) ||
      userName
        .split(" ")
        .some((word) => word.startsWith(searchTermLower))
    );
  });

  return (
    <div className="absolute z-50 bottom-10 right-1/4 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto min-w-[200px]">
      {filteredUsers.map((user) => (
        <div
          key={user.id}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSelectUser(user);
          }}
          className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <p className="poppins-12 !font-medium text-gray-900 whitespace-nowrap">
              {user.name}
            </p>
            {user.role && (
              <p className="poppins-10 text-gray-500 whitespace-nowrap bg-gris-claro rounded-[5px] px-2 py-1">
                {user.role}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MentionDropdown;
