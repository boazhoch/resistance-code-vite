import { FileUploader as AwsFileUploader } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";

const FileUploader = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="mb-3 w-full max-w-4xl">
        <AwsFileUploader
          accessLevel="public"
          acceptedFileTypes={["video/*", "image/*"]}
        />
      </div>
    </div>
  );
};

export { FileUploader };
