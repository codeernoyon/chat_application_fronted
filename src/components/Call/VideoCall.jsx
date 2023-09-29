import { useStateProvider } from "@/context/StateContext";
import Container from "./Container";

function VideoCall() {
  const [{ videoCall }] = useStateProvider();
  return (
    <div className="h-screen w-full">
      <Container data={videoCall} />
    </div>
  );
}

export default VideoCall;
