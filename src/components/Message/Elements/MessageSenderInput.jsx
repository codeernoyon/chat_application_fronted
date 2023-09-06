const MessageSenderInput = ({ message, setMessage }) => {
  return (
    <div className="w-full">
      <input
        type="text"
        value={message}
        placeholder="Type Message...."
        className="outline-none bg-slate-700 w-full py-3 px-5 rounded-md placeholder:pl-3 "
        onChange={(e) => setMessage(e.target.value)}
      />
    </div>
  );
};

export default MessageSenderInput;
