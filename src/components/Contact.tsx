import React from "react";

const Contact: React.FC = () => {
  return (
    <div>
      <h1 className="text-6xl font-bold text-center text-color pb-20 pt-40 font-mont ">
        Contact
      </h1>
      <div className="flex">
        <div>
          <img
            src="/images/undraw_Contact_us_re_4qqt.png"
            alt="contact logo"
            className="w-3/4 ml-10 rounded-t-full"
          />
        </div>
        <div className="mr-20">
          <form>
            <input
              type="text"
              placeholder="Enter Your name"
              className="pl-2 w-80 h-10 rounded-md border-2 border-gray-400"
            />
            <input
              type="text"
              placeholder="Enter Your name"
              className="pl-2 w-80 h-10 rounded-md block mt-10 border-2 border-gray-400"
            />
            <textarea
              placeholder="Message"
              className="border-2 border-gray-400 pl-2 mt-10 w-80 rounded-md h-44 "
            ></textarea>
            <button className="px-14 rounded-md text-white py-6 bg-green-800 hover:bg-green-900 mb-40">
              Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
