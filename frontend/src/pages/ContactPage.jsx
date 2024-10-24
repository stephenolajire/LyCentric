import React from 'react'
import style from "../css/ContactPage.module.css"
import ContactHero from '../components/ContactHero'
import Form from '../components/Form'
import Social from '../components/Social'

const ContactPage = () => {
  return (
    <main className={style.container}>
      <div className={style.contactHero}>
        <ContactHero/>
      </div>
      <div className={style.contactInfoDiv}>
        <div className={style.info}>
          <p className={style.text}>Please fill in the information below</p>
        </div>
      </div>
      <div className={style.contactInfo}>
        <Social/>
        <Form/>
      </div>
    </main>
  )
}

export default ContactPage
