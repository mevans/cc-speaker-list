import { Speaker } from './speaker.type';

export type SpeakerResponse = {
  results: Omit<Speaker, 'id'>[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
};
