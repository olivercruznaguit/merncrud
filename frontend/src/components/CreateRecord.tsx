import { ChangeEvent, useState } from "react";

const CreateRecord = () => {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: 0,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const person = { ...form };
      console.log(person)
      await fetch(`http://localhost:5050/record`, {
        method: "POST",
        body: JSON.stringify(person),
        headers: {
            "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("A problem occurred with your fetch operation: ", error);
    } finally {
      setForm({
        name: "",
        position: "",
        level: 0,
      });
    }
  };

  const handleInputString = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Ensure that numeric values are converted to strings for the form state
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value, // Convert level value to string if necessary
    }));
  };

  const handleInputNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Ensure that numeric values are converted to strings for the form state
    setForm((prevForm) => ({
      ...prevForm,
      [name]: Number(value), // Convert level value to string if necessary
    }));
  };
  return (
    <div className="mx-20 flex flex-row  justify-center w-full">
      <form className="flex flex-col gap-20 bg-teal-100 p-10" onSubmit={handleSubmit}>
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
            onChange={handleInputNumber}
          />
        </label>
        <button
          type="submit"
          className="bg-teal-600 text-white rounded px-4 py-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateRecord;
