import React, { ChangeEvent, Dispatch, useState } from "react";

interface props {
  name: string;
  position: string;
  level: number;
  id: string;
  setIsDoneUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateRecord: React.FC<props> = ({
  name,
  position,
  level,
  id,
  setIsDoneUpdating,
}) => {
  const [form, setForm] = useState({
    name: name,
    position: position,
    level: level,
  });

  const handleInputString = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "level" ? Number(value) : value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDoneUpdating(true);
    try {
      const newRecord = { ...form };
      await fetch(`http://localhost:5050/record/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(newRecord),
      });
    } catch (error) {
      console.error("A problem occurred with your fetch operation: ", error);
      setIsDoneUpdating(false);
    } finally {
      setIsDoneUpdating(false);
      setForm({
        name: "",
        position: "",
        level: 0,
      });
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form
        className="flex flex-row gap-5  bg-blue-400 p-10  rounded-xl"
        onSubmit={handleUpdate}
      >
        <label htmlFor="name" className="flex flex-col gap-2">
          Name
          <input
            name="name"
            type="text"
            placeholder="Enter the name"
            className="border border-teal-600 rounded px-5 h-10"
            value={form.name}
            onChange={handleInputString}
          />
        </label>
        <label htmlFor="position" className="flex flex-col gap-2">
          Position
          <input
            name="position"
            type="text"
            placeholder="Enter the position"
            className="border border-teal-600 rounded px-5 h-10"
            value={form.position}
            onChange={handleInputString}
          />
        </label>
        <label htmlFor="level" className="flex flex-col gap-2">
          Level
          <input
            name="level"
            type="number"
            placeholder="Enter the Level"
            className="border border-teal-600 rounded px-5 h-10"
            value={form.level}
            onChange={handleInputString}
          />
        </label>
        <button
          type="submit"
          className="bg-teal-600 text-white rounded px-4 py-2"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateRecord;
