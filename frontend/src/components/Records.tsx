import { useEffect, useState } from "react";
import { IRecord } from "../interfaces/data";
import { FaRegTrashAlt } from "react-icons/fa";

const Records = () => {
  const [records, setRecords] = useState<IRecord[]>([]);

  const deleteRecord = async (params:string) => {
    try {
        await fetch(`http://localhost:5050/record/${params}`, {
            method: "DELETE",
        });

        // Assuming records is your current array of records
        const updatedRecords = records.filter((prev) => prev._id !== params);
        setRecords(updatedRecords);
    } catch (error) {
        console.error("Error deleting record:", error);
        // Handle error (e.g., show error message)
    }
};

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);
  return (
    <div className="w-full flex justify-center item-center">
      <table className="table-auto w-1/2 mx-20 rounded-xl border-separate border-spacing-4 border-spacing-y-10 px-5 bg-teal-100">
        <thead className="bg-teal-600 text-white">
          <tr className="text-center">
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="">
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.name}</td>
              <td>{record.position}</td>
              <td className="flex items-center justify-center">{record.level}</td>
              <td>{record._id}</td>
              <td className="flex items-center justify-center cursor-pointer"><FaRegTrashAlt onClick={() => deleteRecord(record._id)}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Records;
