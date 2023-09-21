import { Bars } from "react-loader-spinner";

const LoadingBar = () => {
  return (
    <div className="h-full w-full bg-panel-header-background flex justify-center items-center">
      <Bars
        height="50"
        width="40"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default LoadingBar;
