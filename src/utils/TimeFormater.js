export const timeFormater = (seconds) => {
  if (seconds === NaN) return "00:00";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = remainingSeconds.toFixed(0).toString().padStart(2, "0");

  return `${minutesStr}:${secondsStr}`;
};
