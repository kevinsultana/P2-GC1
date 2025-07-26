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
          setImgUrl(result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <div>
      <button
        className="btn btn-primary text-xs md:text-sm lg:text-base"
        onClick={(e) => {
          e.preventDefault();
          widgetRef.current.open();
        }}
      >
        Upload Cloudinary
      </button>
    </div>
  );
}
