type heroProps = {
  name: string;
};

export default function Hero(props: heroProps) {
  return (
    <div className=" font-mont text-center pt-48 text-2xl md:text-6xl font-semibold bg-black text-white">
      <p className="">Welcome to our {props.name}</p>
      <p className="text-xl pt-2 pb-40 md:pt-5 font-normal md:mr-40 md:ml-40">
        Welcome to our blog community! 🌟 Here, we share inspiring stories,
        tips, and ideas around productivity, personal growth, and the art of
        to-do lists. Whether you're looking for motivation, tools to boost your
        day, or a place to share your own journey, you've come to the right
        spot. Dive in, explore, and let's make every task a little more
        meaningful together! ✨
      </p>
    </div>
  );
}
