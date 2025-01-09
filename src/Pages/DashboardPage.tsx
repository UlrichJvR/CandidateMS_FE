import React, { useEffect, useState } from "react";
import {
  getCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  Candidate,
} from "../api/candidateService.ts";
import Dialog from "../components/Dialog.tsx";
import CandidateReport from "../components/CandidateReport.tsx";

const Dashboard = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getCandidates();
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const addCandidate = async (newCandidate: Candidate) => {
    try {
      const created = await createCandidate(newCandidate);
      setCandidates([...candidates, created]);
      alert("Successfully created candidate");
    } catch (error) {
      alert("Error creating candidate");
      console.error("Error creating candidate:", error);
    }
  };

  const updateCandidateById = async (
    id: string,
    updatedCandidate: Candidate
  ) => {
    try {
      await updateCandidate(id, updatedCandidate);

      setCandidates((prevCandidates) =>
        prevCandidates.map((c) =>
          c.id === id ? { ...c, ...updatedCandidate } : c
        )
      );

      alert("Successfully updated candidate");
    } catch (error) {
      alert("Error updating candidate");
      console.error("Error updating candidate:", error);
    }
  };

  const deleteCandidateById = async (id: string) => {
    try {
      await deleteCandidate(id);
      setCandidates(candidates.filter((candidate) => candidate.id !== id));
      setConfirmDeleteId(null);
      setExpandedId(null);
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  const startEditCandidate = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setIsDialogOpen(true);
  };

  const handleSaveCandidate = async (candidate: Candidate) => {
    if (editingCandidate) {
      candidate.id = editingCandidate.id;
      await updateCandidateById(editingCandidate.id ?? "", candidate);
    } else {
      await addCandidate(candidate);
    }
  };

  const handleDeleteConfirmation = (id: string) => {
    setConfirmDeleteId(id);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const confirmDelete = () => {
    if (confirmDeleteId !== null) {
      deleteCandidateById(confirmDeleteId);
    }
  };

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const closeDialog = () => {
    setEditingCandidate(null);
    setIsDialogOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold mb-4 flex justify-center">
          Candidate Management System
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-2 rounded mr-2 h-6"
        >
          Log Out
        </button>
      </div>

      {/* Add Candidate Button */}
      <div className="w-full justify-end flex py-4">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Add Candidate
        </button>
      </div>

      {/* Table displaying candidates */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full table-auto border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border-b border-gray-300">
                First Name
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-300">
                Last Name
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-300">
                Email
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-300">
                Phone
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-300">
                Role
              </th>
              <th className="border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate: Candidate) => (
              <React.Fragment key={candidate.id}>
                <tr
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleExpand(candidate.id ?? "")}
                >
                  <td className="px-4 py-2 border-t border-gray-300">
                    {candidate.firstName}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-300">
                    {candidate.lastName}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-300">
                    {candidate.email}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-300">
                    {candidate.phoneNumber}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-300">
                    {candidate.role}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-300 text-center">
                    {/* Edit Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditCandidate(candidate);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteConfirmation(candidate.id ?? "");
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                    {/* Expand Button */}
                    {/* <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click from triggering toggleExpand
                        toggleExpand(candidate.id ?? "");
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                    >
                      {expandedId === candidate.id ? "Close" : "Expand"}
                    </button> */}
                  </td>
                </tr>
                {expandedId === candidate.id && (
                  <tr>
                    <td colSpan={6} className="px-4 py-2 border bg-gray-100">
                      <div>
                        <strong>Skills:</strong>
                        <ul>
                          {candidate.skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong>Experience:</strong>
                        <p>{candidate.experience}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5">
        <CandidateReport candidates={candidates} />
      </div>

      {/* Dialog for Add/Edit Candidate */}
      <Dialog
        isOpen={isDialogOpen}
        closeDialog={closeDialog}
        candidateToEdit={editingCandidate}
        saveCandidate={handleSaveCandidate}
      />

      {/* Delete Confirmation Dialog */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this candidate?
            </h3>
            <div className="flex justify-between">
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
