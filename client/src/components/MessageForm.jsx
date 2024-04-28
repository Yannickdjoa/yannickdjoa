import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';

function MessageForm() {
  const [open, setOpen] = React.useState(false);
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    const SERVICEID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const TEMPLATEID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const PUBLICKEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(SERVICEID, TEMPLATEID, form.current, {
        publicKey: PUBLICKEY,
      })
      .then(
        (result) => {
          setOpen(true);
          form.current.reset();
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };
  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="flex flex-col p-8 rounded-2xl gap-3 mt-6 bg-neutral-700"
    >
      <label className="text-2xl text-white mb-2 font-semibold">
        Message me
      </label>
      <input
        type="text"
        name="user_name"
        placeholder="full name or company"
        className="input"
      />
      <input
        type="email"
        name="user_email"
        placeholder="Your email "
        className="input"
      />
      <input
        type="number"
        name="user_phone"
        placeholder="Your Mobile"
        className="input"
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        className="input"
      />
      <textarea
        type="text"
        name="message"
        placeholder="Write your message here"
        className="textarea"
      />
      <button
        type="submit"
        value="Send"
        className="cursor-pointer active w-full text-center bg-yellow-600 mt-1 p-3 rounded-xl text-xl font-semibold text-neutral-700"
      >
        Send
      </button>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="Email successfully sent"
        severity="success"
      />
    </form>
  );
}

export default MessageForm;
