/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Textarea } from '@mantine/core';
import { ParallaxLayer } from '@react-spring/parallax';
import useNotification from '../../hooks/useNotification';
import useEmailJs from '../../hooks/useEmailJs';

import usePageConfig from '../../hooks/usePageConfig';
import userData from '../../data/userData.json';

import classes from './ContactMe.module.css';
import FlexCard from '../UI/FlexCard';

const labelProps = {
  style: {
    marginTop: '0.7rem',
    color: '#fff',
  },
};

const ContactMe: React.FC<{offset: number}> = ({ offset }) => {
  const showNotification = useNotification();
  const { pagesConfig } = usePageConfig();
  const {
    sendEmail, isSuccess, isSending, isError,
  } = useEmailJs();

  const form = useForm({
    initialValues: {
      email: '',
      subject: '',
      name: '',
      message: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Please enter a valid email'),
    },
  });
  useEffect(() => {
    if (isSending) {
      showNotification({
        message: 'Your email is on the way!',
        title: 'Sending...',
        type: 'loading',
      });
    }
  }, [isSending, showNotification]);

  const reset = useCallback(() => form.reset(), []);

  useEffect(() => {
    const timeout = 5000;
    if (isSuccess) {
      showNotification({
        message: 'Your mail has been sent! I will reach you out you as soon as possible!',
        title: 'Success',
        type: 'success',
        timeout,
      });
      setTimeout(() => {
        reset();
      }, timeout);
    }
  }, [isSuccess, showNotification, reset]);

  useEffect(() => {
    if (isError) {
      showNotification({
        message: (
          <>
            Oops, something went wrong.
            <br />
            You can contact me directly at
            {' '}
            <a href={`mailto:${userData.email}`}>{userData.email}</a>
          </>
        ),
        title: 'Error',
        type: 'error',
        timeout: 15000,
      });
    }
  }, [isError, showNotification]);

  const submitHandler = form.onSubmit(
    (values) => sendEmail({
      from: values.email,
      subject: values.subject,
      name: values.name,
      message: values.message,
    }),
  );

  return useMemo(() => (
    <ParallaxLayer
      id="contact-me"
      offset={offset}
      factor={pagesConfig.factor}
      speed={pagesConfig.contactMe.speed}
    >
      <FlexCard title="Contact me" className={classes.mainContainer}>
        <form onSubmit={submitHandler}>
          <TextInput
            required
            label="Your Name:"
            name="name"
            labelProps={labelProps}
            placeholder="Your Name"
            description="Please enter your name or company"
            {...form.getInputProps('name')}
          />
          <TextInput
            required
            label="Your Email:"
            name="email"
            labelProps={labelProps}
            placeholder="@ Your Email"
            {...form.getInputProps('email')}
          />
          <TextInput
            required
            label="Subject:"
            labelProps={labelProps}
            name="subject"
            description="Please enter short summary of your message"
            placeholder="Subject"
            {...form.getInputProps('subject')}
          />
          <Textarea
            required
            label="Message:"
            name="Message"
            placeholder="Hi, i'd like to talk about..."
            labelProps={labelProps}
            resize="vertical"
            {...form.getInputProps('message')}
          />
          <div className={classes.controls}>
            <button type="submit" className={classes.submit}>Submit</button>
          </div>
        </form>
      </FlexCard>
    </ParallaxLayer>
  ), [offset, form]);
};

export default ContactMe;
