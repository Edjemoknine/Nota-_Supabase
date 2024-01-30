import { useState } from "react";
import { supabase } from "../supabaseClient";

const NoteForm = ({ type, setIsOpen, id }) => {
  const [state, setState] = useState({});
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (type === "Create") {
      try {
        await supabase
          .from("notes")
          .insert([{ title: state.title, description: state.description }])
          .select();
      } catch (error) {
        console.log(error);
      }
    } else if (type === "Update") {
      try {
        await supabase
          .from("notes")
          .update({ title: state.title, description: state.description })
          .eq("id", id)
          .select();
      } catch (error) {
        console.log(error);
      }
    }
    setIsOpen(false);
  };
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/50">
      <form
        className="bg-white p-3 z-40 rounded-md shadow-xl flex flex-col gap-3 max-w-lg w-full"
        onSubmit={onSubmit}
      >
        <input
          className="outline-none border px-4 py-2 rounded-md"
          type="text"
          placeholder="title"
          name="title"
          onChange={handleChange}
        />
        <textarea
          className="outline-none border px-4 py-2 rounded-md"
          name="description"
          cols="20"
          placeholder="Description"
          rows="6"
          onChange={handleChange}
        ></textarea>
        <button
          type="submit"
          className="bg-sky-500 text-white font-bold px-4 py-2 rounded-md"
        >
          {type}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
