import axios from 'axios';
import { useState } from 'react';

interface CultContactMessagePayload {
  email: string;
  xUsername: string;
  telegramId: string;
  bestContent: string;
  message: string;
}

interface MutationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const pushsupportBaseURL = 'https://tooling.push.org/apis';

const sendCultMessage = async (payload: CultContactMessagePayload) => {
  const response = await axios({
    method: 'POST',
    url: `${pushsupportBaseURL}/mailing/send_cult_mail`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const useSendCultContactMessage = () => {
  const [isPending, setIsPending] = useState(false);

  const mutate = async (
    payload: CultContactMessagePayload,
    options?: MutationOptions
  ) => {
    setIsPending(true);

    try {
      await sendCultMessage(payload);
      options?.onSuccess?.();
    } catch (error) {
      options?.onError?.(error as Error);
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
};
