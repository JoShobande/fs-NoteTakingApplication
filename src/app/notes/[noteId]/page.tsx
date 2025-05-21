'use client'
import { useEffect, useState } from "react";
import { use } from "react";

type Note = {
    id: string;
    title: string;
    noteContent: string;
    themeColor: string;
    createdAt: string;
};

const noteDetail = ({ params }: { params:Promise<{ noteId: string }>}) => {
    const [noteDetail, setNoteDetail] = useState<any>();
    const { noteId } = use(params);

    useEffect(() => {
        fetch(`/api/notes/all/${noteId}`)
        .then((res) => {
            if (!res.ok) throw new Error("Not authorized");
            return res.json();
        })
        .then(setNoteDetail)
        .catch(console.error);
    }, []);
    
    return(
        <div>note detail</div>
    )
}

export default noteDetail;