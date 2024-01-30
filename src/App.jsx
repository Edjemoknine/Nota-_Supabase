import NoteCard from "./components/NoteCard";
import NoteForm from "./components/NoteForm";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [notes, setNotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const GetNotes = async () => {
    const { data } = await supabase.from("notes").select();
    setNotes(data);
  };

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    GetNotes();

    // Get user session
    const getSession = async () => {
      const session = await supabase.auth.getSession();

      setUser(session.data.session);
    };
    getSession();

    // State Change session
    supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_IN":
          setUser(session?.user);
          break;
        case "SIGNED_OUT":
          setUser(null);
          break;
        default:
      }
    });
  }, []);

  return (
    <>
      <div className="flex px-8  bg-[#ddd] txt-white justify-between items-center py-2">
        <h1 className="text-2xl font-bold">Nota</h1>
        {user ? (
          <div className="flex items-center gap-3">
            <button
              className="bg-blue-950 p-1 text-white rounded-md cursor-pointer text-sm px-3 hover:bg-blue-700"
              onClick={logout}
            >
              SignOut
            </button>
            <img
              className="w-8 h-8 border-blue-500 border-2 rounded-full"
              src={user?.user?.user_metadata?.avatar_url}
              alt="avatar"
            />
          </div>
        ) : (
          <button
            className="bg-blue-800 text-white p-1 rounded-md cursor-pointer text-sm px-3 hover:bg-blue-700"
            onClick={login}
          >
            SignIn
          </button>
        )}
      </div>
      <main className="container mx-auto p-4 lg:px-8 ">
        {isOpen && <NoteForm setIsOpen={setIsOpen} type={"Create"} />}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-medium italic pb-1 border-b-8 border-sky-500 w-fit ">
            Quick Note
          </h1>

          <button
            onClick={() => setIsOpen(true)}
            className="text-3xl font-medium text-white bg-green-500 w-10 h-10 rounded-full flex justify-center items-center"
          >
            +
          </button>
        </div>
        <div className="grid md:grid-cols-4 gap-3 grid-cols-2 mt-12">
          {notes?.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              description={note.description}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
