import { Speaker } from './speaker.type';

export type SpeakerResponse = {
  // ID is generated client side and isn't present API response
  results: Omit<Speaker, 'id'>[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
};
