import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const apiUrl = "https://8fd85044d6f4480a8a44b0838cc19de9.api.mockbin.io/";
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  const getData = async () => {
    try
    {
      const response = await axios.get(apiUrl);
      if (response.status === 200)
      {
        setData(response.data);
        setLoading(false);
      }
    }
    catch (e)
    {
      setLoading(true)
      throw new Error(e);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const itemsToDisplay = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setPage(pageNumber);
  }

  return (
    <>
      <div>
        {loading && <div style={{ textAlign: "center", margin: "1rem", fontWeight: "bold", fontSize: "5rem" }}>LOADING...</div>}
        {
          itemsToDisplay.map((person, index) => <div key={index} style={{ border: "2px solid black", margin: "1rem", padding: "0.5rem" }}>
            <div>City: {person.city}</div>
            <div>DOB: {person.date_of_birth}</div>
            <div>Email: {person.email}</div>
            <div>Name: {person.name}</div>
          </div>)
        }
      </div>
      <div style={{ textAlign: "center", margin: "1rem", cursor: "pointer" }}>
        <button style={{ marginRight: "1rem" }} onClick={() => paginate(page - 1)} disabled={page === 1}>Previous</button>
        <span>{page}</span>
        <button style={{ marginLeft: "1rem" }} onClick={() => paginate(page + 1)} disabled={indexOfLastItem >= data.length}>Next</button>
      </div>
    </>
  )
}

export default App