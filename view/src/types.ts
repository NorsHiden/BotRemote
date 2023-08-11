export type Queue = {
  url: string;
  title: string;
  views: number;
  artist: string;
  thumbnail: string;
  duration: number;
  requester: string;
  seek: number;
  state: "PLAYING" | "PAUSED" | "STOPPED";
};

export type Guild = {
  id: string;
  name: string;
  iconURL: string;
};
