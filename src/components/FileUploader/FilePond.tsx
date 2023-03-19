import React, { useRef, useState } from "react";
import "./FilePond.css";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondValidationPlugin from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { ProcessServerConfigFunction } from "filepond";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondValidationPlugin
);

// Our app
export const FileUplaod = ({
  process,
  onprocessfiles,
}: {
  process: ProcessServerConfigFunction;
  onprocessfiles: () => void;
}) => {
  const [state, setState] = useState<{ files: Array<File> }>({
    files: [],
  });

  const filePondRef = useRef<FilePond | null>();

  return (
    <FilePond
      ref={(ref) => {
        filePondRef.current = ref;
      }}
      files={state.files}
      acceptedFileTypes={["video/*", "image/*"]}
      allowMultiple={true}
      allowReorder={true}
      server={{ process }}
      onprocessfiles={onprocessfiles}
      name="files" /* sets the file input name, it's filepond by default */
      oninit={() => {
        console.log("init");
      }}
      onupdatefiles={(fileItems) => {
        // Set currently active file objects to state
        setState({
          files: fileItems.map((fileItem) => fileItem.file) as Array<File>,
        });
      }}
    />
  );
};
