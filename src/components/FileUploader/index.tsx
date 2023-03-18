import { useState, useMemo } from "react";

const FileUploader = ({
  renderFiles,
}: {
  renderFiles: (media: string[]) => React.ReactNode;
}) => {
  const [files, setFiles] = useState<FileList>();

  const previewObjectUrls = useMemo(() => {
    if (!files) {
      return [];
    }

    const objectUrls = Array.from(files).map(URL.createObjectURL);

    return objectUrls;
  }, [files]);

  // create a preview as a side effect, whenever selected file is changed

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="mb-3 w-full max-w-md">
        <label
          htmlFor="formFileMultiple"
          className="mb-2 inline-block text-neutral-700 dark:text-neutral-200 cursor-pointer"
        >
          Multiple files input example
        </label>
        <input
          accept="video/*, image/*"
          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 dark:border-neutral-600 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 dark:text-neutral-200 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 dark:file:bg-neutral-700 file:px-3 file:py-[0.32rem] file:text-neutral-700 dark:file:text-neutral-100 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
          type="file"
          id="formFileMultiple"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              setFiles(e.target.files);
            }
          }}
        />
      </div>
      <div>{renderFiles(previewObjectUrls)}</div>
    </div>
  );
};

export { FileUploader };
