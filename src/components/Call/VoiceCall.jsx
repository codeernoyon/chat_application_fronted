import { useStateProvider } from "@/context/StateContext";
import Container from "./Container";

function VoiceCall() {
  const [{ voiceCall }] = useStateProvider();
  return (
    <div className="h-screen w-full">
      <Container data={voiceCall} />
    </div>
  );
}

export default VoiceCall;
