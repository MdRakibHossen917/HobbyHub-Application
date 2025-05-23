import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const formatTime12Hour = (date) => {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
};

const CreateGroup = () => {
  const { user, loading } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const form = e.target;
    const formatHour = formatTime12Hour(selectedTime);
    const formattedDate = startDate.toLocaleDateString("en-CA");

    const groupData = {
      groupName: form.groupName.value,
      category: form.category.value,
      description: form.description.value,
      location: form.location.value,
      maxMembers: form.maxMembers.value,
      image: form.image.value,
      formattedDate,
      formatHour,
      day: form.day.value,
      userName: user.displayName,
      userEmail: user.email,
    };

    console.log("Sending:", groupData);

    fetch("http://localhost:5000/createGroup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(groupData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server response:", data);
         Swal.fire("Group created successfully!");
        // alert("Group created successfully!");
        form.reset();
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="bg-[#F4F3F0] lg:p-5 mx-50 my-10">
      <h2 className="text-3xl text-center font-bold">Create Hobby Group</h2>
      <form onSubmit={handleAddSchedule}>
        {/* Group Name */}
        <div className="form-control">
          <label className="label font-bold">Group Name</label>
          <input
            type="text"
            name="groupName"
            placeholder="Group Name"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Category */}
        <div className="form-control mt-2">
          <label className="label font-bold">Hobby Category</label>
          <select name="category" className="input input-bordered w-full">
            <option>Drawing & Painting</option>
            <option>Photography</option>
            <option>Video Gaming</option>
            <option>Fishing</option>
            <option>Running</option>
            <option>Cooking</option>
            <option>Reading</option>
            <option>Writing</option>
          </select>
        </div>

        {/* Description */}
        <div className="form-control mt-2">
          <label className="label font-bold">Description</label>
          <textarea
            name="description"
            required
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Location & Members */}
        <div className="flex gap-6 mt-2">
          <div className="form-control w-1/2">
            <label className="label font-bold">Location</label>
            <input
              type="text"
              name="location"
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-1/2">
            <label className="label font-bold">Max Members</label>
            <input
              type="number"
              name="maxMembers"
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex gap-6 mt-2">
          <div className="form-control w-full">
            <label className="label font-bold">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="input input-bordered ml-4 w-full"
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="form-control  w-full">
            <label className="label font-bold">Time</label>
            <DatePicker
              selected={selectedTime}
              onChange={(date) => setSelectedTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className="input input-bordered ml-4 w-full"
            />
          </div>
        </div>

        {/* Day & Image */}
        <div className="flex gap-6 mt-2">
          <div className="form-control w-1/2">
            <label className="label font-bold">Day</label>
            <select name="day" className="input input-bordered w-full">
              <option>Sunday</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
            </select>
          </div>
          <div className="form-control w-1/2">
            <label className="label font-bold">Image URL</label>
            <input
              type="text"
              name="image"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Readonly User Info */}
        <div className="flex gap-6 mt-2">
          <div className="form-control w-1/2">
            <label className="label font-bold">User Name</label>
            <input
              type="text"
              value={user.displayName || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-1/2">
            <label className="label font-bold">User Email</label>
            <input
              type="email"
              value={user.email || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Submit */}
        <input
          type="submit"
          value="Create Group"
          className="btn w-full bg-blue-600 text-white mt-6"
        />
      </form>
    </div>
  );
};

export default CreateGroup;
