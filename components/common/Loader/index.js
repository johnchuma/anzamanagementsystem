const Loader = ({height}) => {
  return (
    <div className={`flex ${height??"h-125"} items-center justify-center bg-white`}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
