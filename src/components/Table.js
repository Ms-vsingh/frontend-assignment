import React, { useState, useEffect } from "react";
import "./Table.css";
import Pagination from "./Pagination";

const Table = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="table-container">
      <h1>Projects Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p role="alert">Error: {error} </p>
      ) : (
        <>
          <table className="table" aria-label="Project Details Table">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Percentage funded</th>
                <th scope="col">Amount pledged</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((user) => (
                <tr key={user["s.no"]}>
                  <td>{user["s.no"]}</td>
                  <td>
                    {user["percentage.funded"]
                      ? user["percentage.funded"]
                      : "-"}
                  </td>
                  <td>
                    {user["amt.pledged"] ? "$" + user["amt.pledged"] : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          />
        </>
      )}
    </div>
  );
};

export default Table;
