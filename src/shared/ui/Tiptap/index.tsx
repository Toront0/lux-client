import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface ITiptap {
  description: string;
  onChange: (v: string) => void;
}

const Tiptap = ({ description, onChange }: ITiptap) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],

    content: description,
    editorProps: {
      attributes: {
        class:
          "bg-opac-b-2 dark:bg-opac-w-2 min-h-64 rounded border border-opac-b-1 dark:border-opac-w-1 focus:border-blue-7 focus:dark:border-blue-7 text-sm text-gray-4 dark:text-gray-12 p-2 focus:outline-none"
      }
    },

    onUpdate({ editor }) {
      onChange(editor.getText());

      console.log("editor.getHTML()", editor.getText());
    }
  });

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
