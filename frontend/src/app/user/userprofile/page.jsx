import React from 'react';

const UserProfile = () => {
  const userData = {
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    location: 'New York, USA',
    profilePicture: 'https://via.placeholder.com/150', // Placeholder image URL
    bio: 'Enthusiastic software engineer passionate about building modern web applications. Experienced in React, Node.js, and MongoDB.',
    appliedInterviews: [
      {
        company: 'Google',
        role: 'Software Engineer',
        dateApplied: '2024-09-15',
        status: 'Pending',
      },
      {
        company: 'Amazon',
        role: 'Backend Developer',
        dateApplied: '2024-09-10',
        status: 'Interview Scheduled',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 p-8 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
        {/* Profile Picture and Info */}
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={userData.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{userData.fullName}</h1>
            <p className="text-gray-600">{userData.email}</p>
            <p className="text-gray-600">{userData.location}</p>
          </div>
          <button className="ml-auto py-2 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
            Edit Profile
          </button>
        </div>

        {/* Bio Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bio</h2>
          <p className="text-gray-600">{userData.bio}</p>
        </div>

        {/* Applied Interviews Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Applied Interviews</h2>
          <div className="space-y-4">
            {userData.appliedInterviews.length > 0 ? (
              userData.appliedInterviews.map((interview, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{interview.company}</h3>
                    <p className="text-gray-600">{interview.role}</p>
                    <p className="text-gray-500">Applied on: {new Date(interview.dateApplied).toDateString()}</p>
                  </div>
                  <div className="text-sm text-indigo-600 font-semibold">
                    Status: {interview.status}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No interviews applied yet.</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 justify-center mt-8">
          <button className="py-2 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            View Saved Jobs
          </button>
          <button className="py-2 px-6 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
