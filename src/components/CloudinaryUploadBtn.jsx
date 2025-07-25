import React, { useEffect, useRef } from "react";

export default function CloudinaryUploadBtn({ setImgUrl }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dpjdzqghj",
        uploadPreset: "img-jpg",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          //   console.log("Upload successful:", result.info.secure_url);
          setImgUrl(result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          widgetRef.current.open();
        }}
      >
        Upload with Cloudinary
      </button>
    </div>
  );
}
