import { Speaker } from './speaker.type';

export type SpeakerResponse = {
  results: Speaker[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
};
