import React from 'react'
import style from "../css/ContactPage.module.css"
import ContactHero from '../components/ContactHero'

const ContactPage = () => {
  return (
    <main className={style.container}>
      <div className={style.contactHero}>
        <ContactHero/>
      </div>
      <div className={style.contactInfoDiv}>
        <div className={style.info}>
          Please Fill in the information below
        </div>
        <div className={style.ContactInfo}>
          <div className={style.social}>
              <div className={style.socialFlex}>

              </div>
          </div>
          <div className={style.form}>
              <form className={style.form}>
                  <div className={style.formFlex}>

                  </div>
                  <textarea rows={15}></textarea>
              </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ContactPage
