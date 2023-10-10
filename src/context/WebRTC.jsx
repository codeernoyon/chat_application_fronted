import React, { useEffect, useState } from "react";

const PeerContext = React.createContext(null);

export const usePeer = () => React.useContext(PeerContext);

export const PeerProvider = (props) => {
  const [peer, setPeer] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  const offer = async () => {
    const offer = peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };
  /**
   * @returns create answer for send answer
   */
  const createAnswer = async (offer) => {
    await peer.setRemoteDescription(offer);
    const answer = peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  };
  const setRemoteAns = async (ans) => {
    await peer.setRemoteDescription(ans);
  };

  const handleTrackEvent = async (ev) => {
    const stream = ev.streams;
    setRemoteStream(stream[0]);
  };
  const sendStream = async (stream) => {
    const tracks = stream.getTracks();
    for (const track of tracks) {
      peer.addTrack(track, stream);
    }
    peer.addEventListener("track", handleTrackEvent);
    return () => {
      peer.removeEventListener("track", handleTrackEvent);
    };
  };

  useEffect(() => {
    setPeer(new RTCPeerConnection(servers));
  }, []);
  return (
    <PeerContext.Provider
      value={{
        peer,
        offer,
        createAnswer,
        setRemoteAns,
        sendStream,
        remoteStream,
      }}
    >
      {props.children}
    </PeerContext.Provider>
  );
};
