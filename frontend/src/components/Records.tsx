import { useEffect, useState } from "react";
import { IRecord } from "../interfaces/data";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import UpdateRecord from "./UpdateRecord";

const Records = () => {
  const [records, setRecords] = useState<IRecord[]>([]);
  const [updateValues, setUpdateValues] = useState({
    name: "",
    position: "",
    level: 0,
    id: "",
  });
  const [isDoneUpdating, setIsDoneUpdating] = useState(false);

  const deleteRecord = async (params: string) => {
    try {
      await fetch(`http://localhost:5050/record/${params}`, {
        method: "DELETE",
      });

      const updatedRecords = records.filter((prev) => prev._id !== params);
      setRecords(updatedRecords);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  useEffect(() => {
    getRecords();
    return;
  }, [records.length]);

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

  useEffect(() => {
    if (isDoneUpdating) {
      handleReset()
    }
  }, [isDoneUpdating]);

  useEffect(() => {
    getRecords();
  }, [updateValues]);

  const handleOpenUpdateRecord = (params: IRecord) => {
    if (updateValues.id === "") {
      setUpdateValues({
        name: params.name,
        position: params.position,
        level: params.level,
        id: params._id,
      });
    } else {
      setUpdateValues({
        name: "",
        position: "",
        level: 0,
        id: "",
      });
    }
  };

  const handleReset = () => {
    setUpdateValues({
      name: "",
      position: "",
      level: 0,
      id: "",
    });
  };

  return (
    <div className="w-full flex flex-col  justify-center items-center gap-20">
      <table className="table-auto w-1/2 rounded-xl border-separate border-spacing-4 border-spacing-y-10 px-5 bg-teal-100">
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
              <td className="flex items-center justify-center">
                {record.level}
              </td>
              <td>{record._id}</td>
              <td className="flex items-center gap-5 justify-center cursor-pointer">
                <FaRegTrashAlt
                  className="h-5 w-5"
                  onClick={() => deleteRecord(record._id)}
                />
                <FiEdit3
                  className={`h-5 w-5 ${
                    updateValues.id === record._id ? "bg-blue-400" : ""
                  }`}
                  onClick={() => {
                    handleOpenUpdateRecord(record);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {updateValues.id !== "" ? (
        <UpdateRecord
          name={updateValues.name}
          position={updateValues.position}
          level={updateValues.level}
          id={updateValues.id}
          setIsDoneUpdating={setIsDoneUpdating}
        />
      ) : null}
    </div>
  );
};

export default Records;
