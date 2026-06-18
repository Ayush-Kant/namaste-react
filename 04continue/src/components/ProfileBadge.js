import { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import UserContext from "../utils/UserContext";

const ProfileBadge = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);


        const {
        userName,
        setUserName,
        email,
        setEmail,
        } = useContext(UserContext);
  return (
    <div className="relative">
      {/* Badge */}
      <div
        onClick={() => setShowMenu(!showMenu)}
        className=" 
                    ml-3
                    w-12 h-12
                    rounded-full
                    bg-blue-500
                    text-white
                    font-bold
                    text-lg
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    hover:bg-blue-600
                    transition
                    "
      >
        {userName?.charAt(0).toUpperCase()}
      </div>

      {/* Dropdown */}
      {showMenu && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border p-4 z-50">
          <div className="flex items-center justify-between border-b pb-3">
                <div>
                    {editingName ? (
                        <div>
                    <input
                        className="border rounded px-2 py-1"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onKeyDown={
                        (e) =>{
                                    if (e.key === "Enter") {
                                        setEditingName(false);
                                    }
                            }
                        } 
                    />
                    <p className="text-gray-400 text-sm">Press Enter to Save</p>
                    </div>
                    ) : (
                    <p className="font-semibold">{userName}</p>
                    )}
                </div>

                <button
                    className="text-gray-500 hover:text-blue-500"
                    onClick={() => setEditingName(!editingName)}
                     
                >
                    <FaEdit />
                </button>
                </div>
          <div className="flex items-center justify-between pt-3">
                <div>
                    {editingEmail ? (
                        <div>
                    <input
                        className="border rounded px-2 py-1 w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                          onKeyDown={
                        (e) =>{
                                    if (e.key === "Enter") {
                                        setEditingEmail(false);
                                    }
                            }
                        } 
                       
                    />
                    <p className="text-gray-400 text-sm">Press Enter to Save</p>
                    </div>
                    ) : (
                    <p className="text-sm text-gray-600">{email}</p>
                    )}
                </div>

                <button
                    className="text-gray-500 hover:text-blue-500"
                    onClick={() => setEditingEmail(!editingEmail)}

                >
                    <FaEdit />
                </button>
                </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBadge;