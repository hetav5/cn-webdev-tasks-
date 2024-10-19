import DOMPurify from "dompurify";
import { marked } from "marked";

interface PreviewProps{
  markdown: string;
}

export default function Preview ({markdown}: PreviewProps){
  //const parsed=marked.parse(markdown);
  const parsed=DOMPurify.sanitize(marked.parse(markdown)as string) ;

  return <div>
    <div className="w-full border-l-2 border-zinc-500 fixed bg-neutral-800 font-bold p-3  text-gray-400 uppercase tracking-wider ">Preview</div>
    <div className=" font-serif  h-screen overflow-auto">
      <div className="prose w-full pt-16 prose-invert p-6 h-full prose-a:text-pink-500" dangerouslySetInnerHTML={{__html: parsed}}/>
    </div>    
  </div>;
} 