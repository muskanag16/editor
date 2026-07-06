// src/pages/InvitationsPage.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';
import MainNavbar from '../components/layout/MainNavbar';

const InvitationsPage = () => {
  const [invites, setInvitations] = useState([]);

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const res = await api.get('/invitations/my-invitations');
        console.log("Backend se aaya data:", res.data); // Yahan check karna hai
        setInvitations(res.data);
      } catch (err) {
        console.error("Error fetching invites:", err);
      }
    };
    fetchInvites();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <MainNavbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Your Invitations</h1>
        {invites.length === 0 ? (
          <p>No pending invitations.</p>
        ) : (
          invites.map((invite) => (
            <div key={invite._id} className="p-4 bg-[#161b22] border border-gray-700 rounded-lg mb-4">
              <p>You have been invited to: <strong>{invite.project.name}</strong></p>
              <p>By: {invite.sender.email}</p>
              <button className="mt-2 bg-[#00a65a] px-4 py-2 rounded">Accept</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InvitationsPage;