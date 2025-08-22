import { Note } from "@components/app/notes/page";
import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";



interface NoteOption {
    id: string;
    title: string;
    
}


interface FolderProp {
    name:string
    themeColor:string
    // notes: string[]
}
  
interface CreateFolderModalProps {
    notes?: NoteOption[];
    openFolderModal: boolean
    setOpenFolderModal: Dispatch<SetStateAction<boolean>>
    editMode?: boolean
    folderId?:string
}

const CreateFolder =({
    // notes,
    setOpenFolderModal,
    folderId,
    editMode
  }: CreateFolderModalProps) => {
    const router = useRouter();
   
    const colorOptions = [
      { name: "blue", value: "bg-[#DEF0FF]", bg: "bg-[#DEF0FF]" },
      { name: "Pink", value: "bg-[#FFD6D5]", bg: "bg-[#FFD6D5]" },
      { name: "Blue", value: "bg-[#FEFBEB]", bg: "bg-[#FEFBEB]" },
    ];

    const [name, setName] = useState("");
    const [themeColor, setThemeColor] = useState(colorOptions[0].value);
    const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState<Note[]>([])
  
    

    const handleGetFolderToBeEdited =  async() => {
        // setLoadingNoteDetails(true)
        try {
            const fRes = await fetch(`/api/folders/${folderId}`);
            const nRes = await fetch(`/api/folders/${folderId}/notes`);
            const folderResponse= await fRes.json()
            const notesResponse = await nRes.json()
            setName(folderResponse.name)
            setThemeColor(folderResponse.themeColor)
            setSelectedNotes(notesResponse.map((note:any)=>note.id))
        } catch (err: any) {
          console.error(err)
        } finally {
        //   setLoadingNoteDetails(false)
        }
    }

    const fetchNotes = async () => {
      // setLoading(true)
      try {
        const res = await fetch('/api/notes', {method:'GET'})
        const data = await res.json()
        setNotes(data)
      } catch (err: any) {
        console.error(err)
      } finally {
        // setLoading(false)
      }
    }

    const handleEditFolder = async() => {
      try{
        setLoading(true)
        const res = await fetch(`/api/folders/edit/${folderId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name,  notes: selectedNotes, themeColor, iconColor: themeColor === 'bg-[#DEF0FF]' ? 'bg-[#9398FB]' : themeColor === 'bg-[#FFD6D5]' ? 'bg-[#C1774E]' : 'bg-[#E8E582]' }),
        });
        toast.success('Successfully edited')
        setOpenFolderModal(false)
      }catch(error){
        toast.error(error.message || "Could not edit folder");
      }finally{
        setLoading(false)
      }
    }

    const hanldeCreateNewFolder = async() => {
      if (!name.trim()) {
        toast.error("Folder name is required");
        return;
      }
      setLoading(true);
      try {
        const res = await fetch("/api/folders/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            themeColor,
            notes: selectedNotes,
            iconColor: themeColor === 'bg-[#DEF0FF]' ? 'bg-[#9398FB]' : themeColor === 'bg-[#FFD6D5]' ? 'bg-[#C1774E]' : 'bg-[#E8E582]'
          }),
        });
        if (!res.ok) throw new Error("Failed to create folder");
        toast.success("Folder created");
        setOpenFolderModal(false)
        router.refresh();
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || "Could not save folder");
      } finally {
        setLoading(false);

      }
    }
  
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      editMode ? handleEditFolder() : hanldeCreateNewFolder()
    };

    useEffect(()=>{
        if(editMode){
          handleGetFolderToBeEdited()
        }else{
          setName('')
          setThemeColor(colorOptions[0].value)
          setSelectedNotes([])
        }
    },[folderId, editMode])

    useEffect(()=>{
      fetchNotes()
    },[])
  
    return (
      <div className='z-[99]'>
        <form
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block mb-1 font-medium">Folder Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Class Notes"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <span className="block mb-1 font-medium mb-2 mt-6">Folder Theme Color</span>
            <div className="flex space-x-2">
              {colorOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setThemeColor(opt.value)}
                  aria-label={opt.name}
                  className={`
                    w-8 h-8 rounded-full
                    ${opt.bg}
                    ${themeColor === opt.value ? "ring-2 ring-offset-2 ring-gray-700" : ""}
                  `}
                />
              ))}
            </div>
          </div>
  
          <div className="mb-6 mt-6">
            <label className="block mb-2 font-medium">Select Note(s)</label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-auto">
              {notes.map((n) => {
                const isSelected = selectedNotes.includes(n.id);
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => {
                      setSelectedNotes((prev) =>
                        prev.includes(n.id)
                          ? prev.filter((id) => id !== n.id)  // deselect
                          : [...prev, n.id]                   // select
                      );
                    }}
                    className={`
                      flex items-center justify-between p-3 border rounded-lg 
                      ${isSelected 
                        ? "bg-blue-100 border-blue-500" 
                        : "bg-white border-gray-300 hover:bg-gray-50"}
                    `}
                  >
                    <span className="truncate">{n.title}</span>
                    {isSelected && (
                      <span className="inline-block w-4 h-4 bg-blue-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Click to (de)select notes
            </p>
          </div>
  
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={()=>setOpenFolderModal(false)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Saving…" : editMode? 'Save Changes' : "Create"}
            </button>
          </div>
        </form>
      </div>
    );
}

export default CreateFolder;