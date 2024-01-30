import { useState } from "react";
import NoteForm from "./NoteForm";
import { supabase } from "../supabaseClient";

const NoteCard = ({ id, title, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const deleteNote = async () => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
  };
  return (
    <>
      <div className="bg-[#ddd] p-3 rounded-md flex flex-col hover:shadow-xl duration-300 gap-2">
        <h2 className="font-semibold text-xl">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
        <div>
          <button
            className="px-2 mr-2 cursor-pointer hover:scale-105 duration-300 py-1 text-[10px] rounded-md bg-yellow-400"
            onClick={() => setIsOpen(true)}
          >
            updete
          </button>
          <button
            className="px-2 cursor-pointer hover:scale-105 duration-300 py-1 text-[10px] rounded-md bg-red-500"
            onClick={deleteNote}
          >
            delete
          </button>
        </div>
      </div>
      {isOpen && <NoteForm id={id} setIsOpen={setIsOpen} type={"Update"} />}
    </>
  );
};

export default NoteCard;
