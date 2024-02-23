import React from "react";

const Navbar = () => {
  return (
    <div className="my-4 flex h-[60px] w-[360] items-center justify-center gap-2 rounded-lg bg-white">
      <img src="src/assets/logos_firebase.svg" className="h-[30px]"></img>
      <h1 className="text-xl font-medium">Firebase Contacts App</h1>
    </div>
  );
};

export default Navbar;
