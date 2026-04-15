import { useState, useEffect } from "react";

const FrmUserPinAllocation = () => {

  // 🔹 STATES
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [leftData, setLeftData] = useState([]);     // available pincodes
  const [rightData, setRightData] = useState([]);   // selected pincodes
  const [searchText, setSearchText] = useState("");

  // 🔹 PAGE LOAD → LOAD LEFT SIDE DATA
  useEffect(() => {
    // 🔸 Replace with API
    const allPincodes = [
      "711202", "735132", "798886", "800002", "845401", "999999",
      "100003", "100004", "126896", "422003", "422004", "422005"
    ];

    setLeftData(allPincodes);
  }, []);

  // 🔹 SEARCH USER → LOAD RIGHT SIDE
  const handleSearch = () => {
    // 🔸 Replace with API
    const userAssigned = ["100003", "422003"];

    setUserName("TEST USER");
    setRightData(userAssigned);
  };

  // 🔹 MOVE LEFT → RIGHT
  const moveToRight = (item) => {
    if (rightData.includes(item)) return;

    setRightData([...rightData, item]);
  };

  // 🔹 FILTER LEFT SIDE (REMOVE RIGHT ITEMS)
  const filteredLeft = leftData.filter(
    (item) => !rightData.includes(item) &&
              item.includes(searchText)
  );

  // 🔹 FILTER RIGHT SIDE
  const filteredRight = rightData.filter(
    (item) => item.includes(searchText)
  );

  // 🔹 SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("User:", userId);
    console.log("Selected Pincodes:", rightData);

    alert("Submitted Successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">

        {/* TITLE */}
        <h2 className="text-lg font-semibold mb-6">
          User Pincode Allocation
        </h2>

        {/* USER SECTION */}
        <div className="grid grid-cols-3 gap-4 mb-6 items-center">

          <label>User ID *</label>
          <input
            className="border p-2 rounded"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            🔍
          </button>

          <label>User Name</label>
          <input
            className="border p-2 rounded col-span-2"
            value={userName}
            readOnly
          />
        </div>

        {/* SEARCH BOX */}
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-full mb-4"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* LIST SECTION */}
        <div className="grid grid-cols-2 gap-4">

          {/* LEFT SIDE */}
          <div className="border rounded h-64 overflow-y-auto p-2">
            {filteredLeft.map((item, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => moveToRight(item)}
              >
                {item}
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="border rounded h-64 overflow-y-auto p-2">
            {filteredRight.map((item, index) => (
              <div
                key={index}
                className="p-2 bg-blue-100"
              >
                {item}
              </div>
            ))}
          </div>

        </div>

        {/* SUBMIT */}
        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};

export default FrmUserPinAllocation;