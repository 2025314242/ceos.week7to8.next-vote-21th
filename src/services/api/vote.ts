import { AxiosError } from 'axios';

import { VOTE_TYPES } from '@/lib/constants/vote-types';

import { axiosInstance } from './axios';

export const getVoteList = async (voteType: (typeof VOTE_TYPES)[number]): Promise<{ id: number; name: string }[]> => {
  try {
    const res = await axiosInstance.get(`/api/vote/${voteType}`);
    const voteList = res.data.data;
    return voteList;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const vote = async (voteType: (typeof VOTE_TYPES)[number], candidateId: number): Promise<string | null> => {
  try {
    const res = await axiosInstance.post(`/api/vote/${voteType}`, { candidateId });
    return res.data.data.message;
  } catch (error) {
    const err = error as AxiosError<{ code: string; reason: string }>;
    if (err.response?.status === 403 && err.response.data?.code === 'Member_403') {
      alert(err.response.data.reason);
    } else {
      console.error(error);
    }
    return null;
  }
};

export const getVoteResult = async (
  voteType: (typeof VOTE_TYPES)[number],
): Promise<{ id: number; name: string; voteCount: number }[]> => {
  try {
    const res = await axiosInstance.get(`/api/vote/${voteType}/result`);
    const voteResult = res.data.data;
    return voteResult;
  } catch (error) {
    console.log(error);
    return [];
  }
};
