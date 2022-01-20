import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({ defaultValue, value, onChange }) => {
  return (
    <div>
      {defaultValue ? (
        <CKEditor
          editor={ClassicEditor}
          data={defaultValue}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <CKEditor
          editor={ClassicEditor}
          data=""
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      )}
    </div>
  );
};

export default Editor;
