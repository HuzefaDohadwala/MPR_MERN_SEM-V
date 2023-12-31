import React from "react";
import "./About3.css";
import telehealth from "./telehealth.png";
import peers from "./peers.png";
import securedChatting from "./securedChatting.png";
import experience from "./experience.png";
import premium from "./premium.png";
import marketing from "./marketing.png";

const About3 = () => {
  return (
    <div className="about3_container">
      <h1 className="about3_title">Services we provide</h1>
      <div className="about3_top">
        <div className="about3_teleHealth">
          <div className="about3_iconCell">
            <img
              src={telehealth}
              alt="logo"
              className="about2_icon about2_oppIcon"
            />
          </div>
          <h1 className="about3_subtitle">Telehealth</h1>
          <p>
            Choose between in-person or virtual appointments with the therapist;
            our platform supports both!
          </p>
        </div>
        <div className="about3_peerCommunity">
          <div className="about3_iconCell">
            <img
              src={peers}
              alt="logo"
              className="about2_icon about2_oppIcon"
            />
          </div>
          <h1 className="about3_subtitle">Peer Community</h1>
          <p>
            Gain access to a community of members to share support, advice
            during your private practice journey!
          </p>
        </div>
        <div className="about3_annonymousChats">
          <div className="about3_iconCell">
            <img
              src={securedChatting}
              alt="logo"
              className="about2_icon about2_oppIcon"
            />
          </div>
          <h1 className="about3_subtitle">Anonymous Chats</h1>
          <p>
            User profiles of both members and listeners have the option to chat
            anonymously on the platform.
          </p>
        </div>
      </div>
      <div className="about3_bottom">
        <div className="about3_experience">
          <div className="about3_iconCell">
            <img
              src={experience}
              alt="logo"
              className="about2_icon about2_oppIcon"
            />
          </div>
          <h1 className="about3_subtitle">Experience</h1>
          <p>
            Psychology students can avail a valuable experience by interacting
            with the members and showcase their listening skills.
          </p>
        </div>
        <div className="about3_premium">
          <div className="about3_iconCell">
            <img
              src={premium}
              alt="logo"
              className="about2_icon about2_oppIcon"
            />
          </div>
          <h1 className="about3_subtitle">Premium</h1>
          <p>
            Have an access to advanced features like direct chats with
            therapists after getting a subscription on the platform.
          </p>
        </div>
        <div className="about3_marketing">
          <div className="about3_iconCell">
            <img
              src={marketing}
              alt="logo"
              className="about2_icon about2_oppIcon"
            />
          </div>
          <h1 className="about3_subtitle">Marketing</h1>
          <p>
            For therapists, get your private practice out in front of thousands
            of potential new clients by joining the therapist directory.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About3;
