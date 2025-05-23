// src/pages/UpdateGroup.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    groupName: "",
    category: "",
    startDate: "",
    description: "",
    location: "",
    maxMembers: "",
    image: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/groups/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          groupName: data.groupName || "",
          category: data.category || "",
          startDate: data.startDate || "",
          description: data.description || "",
          location: data.location || "",
          maxMembers: data.maxMembers || "",
          image: data.image || "",
        });
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/groups/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Success", "Group updated successfully", "success");
          navigate("/myGroups");
        }
      });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Group</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Group Name", name: "groupName" },
          { label: "Category", name: "category" },
          { label: "Start Date", name: "startDate", type: "date" },
          { label: "Description", name: "description" },
          { label: "Location", name: "location" },
          { label: "Max Members", name: "maxMembers", type: "number" },
          { label: "Image URL", name: "image" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block mb-1 font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary w-full">
          Update Group
        </button>
      </form>
    </div>
  );
};

export default UpdateGroup;
