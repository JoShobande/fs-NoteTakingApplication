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
    notes,
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
  
    

    const handleGetFolderToBeEdited =  async() => {
        // setLoadingNoteDetails(true)
        try {
            const fRes = await fetch(`/api/folders/${folderId}`);
            // const nRes = await fetch(`/api/folders/${folderId}/notes`);
            const folderResponse= await fRes.json()
            setName(folderResponse.name)
            setThemeColor(folderResponse.themeColor)
            // selectedNotes((folderResponse.))
            // const notesResponse = nRes.json()
            
        } catch (err: any) {
          console.error(err)
        } finally {
        //   setLoadingNoteDetails(false)
        }
    }

 
  
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
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
    };

    useEffect(()=>{
        if(editMode){
            handleGetFolderToBeEdited()
        }
    },[folderId, editMode])
  
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
            <label className="block mb-1 font-medium">Select Note(s)</label>
            <select
              multiple
              value={selectedNotes}
              onChange={(e) =>
                setSelectedNotes(
                  Array.from(e.target.selectedOptions, (o) => o.value)
                )
              }
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {notes?.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.title}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Hold Shift or Ctrl/Cmd to select multiple
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
              {loading ? "Saving…" : "Create"}
            </button>
          </div>
        </form>
      </div>
    );
}

export default CreateFolder;