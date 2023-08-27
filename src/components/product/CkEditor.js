import React, { useEffect, useRef, useState } from "react";

const Editor = ({ onChange, name, value }) => {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    const fetchEditor = async () => {
      const { CKEditor } = await import("@ckeditor/ckeditor5-react");
      const { default: ClassicEditor } = await import("@ckeditor/ckeditor5-build-classic");
      editorRef.current = { CKEditor, ClassicEditor };
      setEditorLoaded(true);
    };

    fetchEditor();
  }, []);

  if (!editorLoaded) {
    return <div>Loading CKEditor...</div>;
  }

  return (
    <div>
      <CKEditor
      name="table"
        editor={ClassicEditor}
        config={{
          ckfinder: {
            uploadUrl: "", // Enter your upload URL
          },
        }}
        data={value}
        // onReady={(editor) => {
        //   editor.setData(value);
        // }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
};

export default Editor;
