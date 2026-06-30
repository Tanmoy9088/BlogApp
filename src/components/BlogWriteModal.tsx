// import React from "react";
type BlogProps = {
  isOpen: boolean;
  onClose: ()=> void;
};
const BlogWriteModal = ({ isOpen, onClose }: BlogProps) => {


  return (
    <div
      className={`w-full h-96 bg-black/10 relative ${isOpen ? "block" : "hidden"}`}
    >
      <div className="absolute right-1 top-0 bg-red-500 text-white px-2">
        <button onClick={onClose}>X</button>
      </div>
      <form action="">
        <input type="text" />
      </form>
    </div>
  );
};

export default BlogWriteModal;
