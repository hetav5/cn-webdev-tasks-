interface Editorprops{
    markdown: string;
    setMarkdown: (markdown: string)=>void;
}

export default function Editor ({markdown, setMarkdown}: Editorprops){
    return <div className="border-r-2 border-zinc-500 h-screen">
        <div className="w-full fixed font-bold bg-neutral-800 p-3 border-zinc-500 text-gray-400 uppercase tracking-wider ">Markdown</div>
        <textarea className="w-full font-mono pt-16 h-full bg-zinc-900 outline-none p-4" onChange={(e)=>setMarkdown(e.target.value)} value={markdown}/>
    </div>
} 