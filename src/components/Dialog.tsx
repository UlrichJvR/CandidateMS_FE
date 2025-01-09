import React, { useEffect, useState } from "react";
import { Candidate } from "../api/candidateService.ts";

const Dialog = ({
  isOpen,
  closeDialog,
  candidateToEdit,
  saveCandidate,
}: {
  isOpen: boolean;
  closeDialog: () => void;
  candidateToEdit: Candidate | null;
  saveCandidate: (candidate: Candidate) => void;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState("");

  const addSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  useEffect(() => {
    if (candidateToEdit) {
      setFirstName(candidateToEdit.firstName);
      setLastName(candidateToEdit.lastName);
      setEmail(candidateToEdit.email);
      setPhoneNumber(candidateToEdit.phoneNumber);
      setRole(candidateToEdit.role);
      setSkills(candidateToEdit.skills);
      setExperience(candidateToEdit.experience);
    } else {
      resetForm();
    }
  }, [candidateToEdit]);

  function resetForm() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setRole("");
    setSkills([]);
    setExperience("");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phoneNumber || !email || !role)
      return;
    saveCandidate({
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      experience,
      skills,
    });
    closeDialog();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[55%] max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold pb-4">
          {candidateToEdit ? "Edit Candidate" : "Add New Candidate"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="pb-4">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
              placeholder="Enter candidate's first name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
              placeholder="Enter candidate's last name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
              placeholder="Enter an email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
              placeholder="Enter a phone number"
              maxLength={10}
              pattern="[0-9]*"
              title="Phone number should contain only numbers"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
              placeholder="Enter candidate role"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Enter a skill and select the plus to add"
              />
              <button
                type="button"
                onClick={addSkill}
                className="ml-2 bg-green-500 text-white px-3 py-2 rounded-full shadow"
              >
                +
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full shadow text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Experience
            </label>
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              rows={4}
              placeholder="Describe your experience..."
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={closeDialog}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {candidateToEdit ? "Update Candidate" : "Add Candidate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dialog;
