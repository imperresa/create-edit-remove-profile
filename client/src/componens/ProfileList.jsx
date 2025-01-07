import { useState } from "react";

export default function ProfileList({ profile, deleteProfile, editProfile,submit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  
  const saveChanges = () => {
    editProfile(profile._id, editedProfile);
    setIsEditing(false);
  };
  return (
    <div className="mt-5 flex flex-col items-center gap-4">
      <div
        key={profile.id}
        className="drop-shadow-2xl bg-slate-200 rounded-md p-5 w-1/2"
      >
        {isEditing ? (
          <>
            <p>Firstname</p>
            <input
              type="text"
              name="firstname"
              value={editedProfile.firstname}
              onChange={handleInputChange}
              className="border rounded p-1 mb-2 w-full"
              placeholder="Firstname"
            />
            <input
              type="text"
              name="lastname"
              value={editedProfile.lastname}
              onChange={handleInputChange}
              className="border rounded p-1 mb-2 w-full"
              placeholder="Lastname"
            />
            <input
              type="text"
              name="nickname"
              value={editedProfile.nickname}
              onChange={handleInputChange}
              className="border rounded p-1 mb-2 w-full"
              placeholder="Nickname"
            />
            <input
              type="date"
              name="birth"
              value={editedProfile.birth}
              onChange={(e) => {
                const newBirth = e.target.value;
                const newAge =
                  new Date().getFullYear() - new Date(newBirth).getFullYear();
                setEditedProfile({
                  ...editedProfile,
                  birth: newBirth,
                  age: newAge,
                });
              }}
              className="border rounded p-1 mb-2 w-full"
            />
            <input
              type="number"
              name="age"
              value={editedProfile.age}
              readOnly
              className="border rounded p-1 mb-2 w-full"
            />
            <select
              name="gender"
              value={editedProfile.gender}
              onChange={handleInputChange}
              className="border rounded p-1 mb-2 w-full"
            >
              <option value="">-</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div className="flex gap-4 mt-2">
              <button
                onClick={saveChanges}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold">
              {profile.firstname} {profile.lastname}
            </h2>
            <p>Nickname: {profile.nickname}</p>
            <p>Date of Birth: {profile.birth}</p>
            <p>Age: {profile.age}</p>
            <p>Gender: {profile.gender}</p>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProfile(profile._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
