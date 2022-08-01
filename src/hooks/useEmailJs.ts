/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { init, send } from '@emailjs/browser';

type MailProps = {
    subject: string,
    message: string,
    from: string,
    name: string,
}

const useEmailJs = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError(false);
      }, 5000);
    }
  }, [isError]);

  async function sendEmail(props: MailProps) {
    init(process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY!);
    setIsSending(true);
    await send(
      process.env.REACT_APP_EMAIL_JS_SENDER_ID!,
      process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID!,
      {
        subject: props.subject,
        name: props.name,
        reply_to: props.from,
        message: props.message,
      },
    ).then((response) => {
      if (response.status === 200) {
        setIsSuccess(true);
      } else {
        setIsError(true);
      }
    }).catch(() => {
      setIsError(true);
    }).finally(() => {
      setIsSending(false);
    });
  }
  // eslint-disable-next-line no-unused-vars
  return {
    sendEmail, isSuccess, isError, isSending,
  };
};

export default useEmailJs;
