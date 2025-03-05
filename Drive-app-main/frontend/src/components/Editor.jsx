import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import CodeBlock from "@tiptap/extension-code-block";
import axios from "axios";

const Editor = ({ accessToken }) => {
  const [title, setTitle] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      Blockquote,
      HorizontalRule,
      CodeBlock,
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert p-4 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none",
        style: "min-height: 500px;",
      },
    },
  });

  const handleSave = async () => {
    if (!editor) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/letter/save`,
        { content: editor.getHTML(), title, accessToken },
        { headers: { authorization: `${token}` } }
      );

      alert("Letter saved successfully!");
      editor.commands.setContent("");
      setTitle("");
    } catch (err) {
      console.error(err);
      alert("Error saving letter");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter letter title..."
        className="w-full p-3 mb-4 text-lg bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex flex-wrap gap-2 p-2 bg-gray-800 rounded-md mb-4">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">I</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">U</button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">S</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">• List</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">1. List</button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">❝ Quote</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">H2</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">H3</button>
        <button onClick={() => editor.chain().focus().undo().run()} className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600">↺ Undo</button>
        <button onClick={() => editor.chain().focus().redo().run()} className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600">↻ Redo</button>
      </div>

      <div className="mb-4">
        <EditorContent editor={editor} />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition duration-300"
      >
        Save to Google Drive
      </button>
    </div>
  );
};

export default Editor;
