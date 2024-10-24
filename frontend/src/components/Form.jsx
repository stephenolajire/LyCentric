import React, { useState } from 'react';
import style from '../css/Form.module.css';


const Form = ({ onSubmit }) => {
  const [name, setName] = ('');
  const [email, setEmail] = ('');
  const [phone, setPhone] = ('');
  const [message, setMessage] = ('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { name, email, phone, message };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div>
        <input 
          className={style.input}
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input 
          className={style.input}
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input 
          className={style.input}
          type="tel"
          placeholder="Your Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      
      <textarea 
        className={style.textarea}
        cols={20} 
        rows={8} 
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <div className={style.btndiv}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;
