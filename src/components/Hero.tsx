type heroProps= {
    name: string
}

export default function Hero(props: heroProps) {
  return (
    <div className=" font-mont text-center pt-48 text-2xl md:text-6xl font-semibold bg-black text-white">
      <p className="">Welcome to our {props.name}</p>
      <p className="text-xl pt-2 pb-40 md:pt-5 font-normal md:mr-40 md:ml-40">
        We are excited to have you here. Whether you're seeking inspiration,
        knowledge, or just a good read, you've come to the right place. Explore
        our latest posts, and feel free to join the conversation!
      </p>
    </div>
  );
}
