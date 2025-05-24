import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router";

const MyGroups = () => {
  const { user } = useContext(AuthContext);
  const [myGroups, setMyGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://hobbyhub-server-steel.vercel.app/myGroups?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMyGroups(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://hobbyhub-server-steel.vercel.app/groups/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setMyGroups((prev) => prev.filter((group) => group._id !== id));
              Swal.fire("Deleted!", "Your group has been deleted.", "success");
            }
          });
      }
    });
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (myGroups.length === 0)
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          No Groups Found
        </h2>
        <p className="text-lg">Create a group to get started!</p>
      </div>
    );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Created Groups</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Group Name</th>
              <th>Category</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myGroups.map((group, index) => (
              <tr key={group._id}>
                <td>{index + 1}</td>
                <td>{group.groupName}</td>
                <td>{group.category}</td>
                <td>{group.startDate}</td>
                <td className="space-x-2">
                  <Link to={`/updateGroup/${group._id}`}>
                    <button className="btn btn-sm btn-info">Update</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(group._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyGroups;
