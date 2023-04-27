const { useState, useEffect } = React;

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(data));
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = { firstName, lastName, phoneNumber };
    if (isUnique(newData)) {
      setData([...data, newData]);
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
    } else {
      alert("Name or phone number is already in the table");
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    }
  };

  const isUnique = (newData) => {
    const { firstName, lastName, phoneNumber } = newData;
    return (
      !data.some(
        (item) =>
          item.firstName === firstName &&
          item.lastName === lastName &&
          item.phoneNumber === phoneNumber
      )
    );
  };

  const handleSearch = (event) => {
    setSearchName(event.target.value);
  };

  const handleSort = () => {
    if (sortOrder === "asc") {
      const sortedData = [...data].sort((a, b) => a.firstName.localeCompare(b.firstName));
      setData(sortedData);
      setSortOrder("desc");
    } else {
      const sortedData = [...data].sort((a, b) => b.firstName.localeCompare(a.firstName));
      setData(sortedData);
      setSortOrder("asc");
    }
  };
  

  const filteredData = data.filter((item) =>
    item.firstName.toLowerCase().includes(searchName.toLowerCase()) ||
    item.lastName.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Form Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="firstNameLastName">Name:</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="firstNameLastName"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="First Name"
                required
              />
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
      <br />
      <div className="form-group">
        <label htmlFor="searchName"><i className="fa fa-search"></i>

</label>
        <input
          type="text"
          className="form-control"
          id="searchName"
          value={searchName}
          onChange={handleSearch}
          placeholder="Search by name"
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th onClick={handleSort}>Name</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.firstName} {item.lastName}</td>
              <td>{item.phoneNumber}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));