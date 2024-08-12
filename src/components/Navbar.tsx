
import LoginForm from "./LoginForm";

type NavProps = {
  lists: {
    first: string;
    second: string;
    third: string;
  };
};

export default function Navbar(props: NavProps) {
  return (
    <div>
      <div className="navbar bg-black bg-opacity-10 backdrop-blur-lg font-mont p-5 fixed top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className=" menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-5 shadow"
            >
              <a href="#Home" className="cursor-pointer">
                <li>{props.lists.first}</li>
              </a>
              <a href="#Blogs" className="cursor-pointer">
                <li>{props.lists.second}</li>
              </a>
              <a href="#Contact" className="cursor-pointer">
                <li>{props.lists.third}</li>
              </a>
            </ul>
          </div>
          <p className="ml-5 font-semibold text-3xl text-white">Blogs</p>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white ">
            <a href="#Home">
              <li className="mr-8 cursor-pointer">{props.lists.first}</li>
            </a>
            <a href="#Blogs">
              <li className="cursor-pointer">{props.lists.second}</li>
            </a>
            <a href="#Contact">
              <li className="ml-8 cursor-pointer">{props.lists.third}</li>
            </a>
          </ul>
        </div>
        <button
          className="btn bg-green-700 text-white hover:bg-green-800 border-none ml-24 lg:mr-20 md:ml-96 py-3 px-10 "
          onClick={() => {
            const modal = document.getElementById(
              "my_modal_3"
            ) as HTMLDialogElement;
            if (modal) {
              modal.showModal();
            }
          }}
        >
          Log In
        </button>
        <dialog id="my_modal_3" className="modal backdrop-blur-sm">
          <div className="modal-box text-black ">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <LoginForm text="Log In" />
          </div>
        </dialog>
      </div>
    </div>
  );
}
