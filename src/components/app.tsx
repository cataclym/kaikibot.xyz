import React, { Component, useState } from "react";
import "../css/styles.css";
import Commands from "./commands";
import embedIcon from "../images/streamline-coding-search--coding--400x400.png";
import discordIcon from "../images/streamline-icon-customer-server-imac-4@400x400.png";
import gitLabIcon from "../images/gitlab-icon-rgb_resized.png";
import inviteIcon from "../images/streamline-avatar-neutral-add-2--users--400x400.png";
import listIcon from "../images/streamline-invoice-spreadsheet-1--business--400x400.png";
import paypal from "../images/PayPal/PP_Transparent_Vertical.png";
import patreon from "../images/patreon_brand_kit/Patreon Brand Assets/Patreon Logo/PNG/Digital-Patreon-Logo_White.png";

const ppLink = "https://paypal.me/kaikibot";
const patreonLink = "https://www.patreon.com/user?u=52353582";

export default class App extends Component {
  constructor(props: any) {
    super(props);
    this.handleCommandClick = this.handleCommandClick.bind(this);
    this.state = {
      toggle: false,
    };
  }

  handleCommandClick() {
    // @ts-ignore
    this.setState((state) => ({ toggle: !state.toggle }));
  }

  images = [
    "https://safebooru.org//images/2997/080802f151827f84ccb9c6d0dca78457aebd72bf.jpg",
    "https://safebooru.org//images/2978/9d7a44378785c4863665c83bcfaede66f05d2599.jpg",
    "https://safebooru.org//images/1437/3629c6ead1a28579bfd4ea7d7fa3b5c4dbb8f224.jpg",
  ];

  render() {
    // @ts-ignore
    const toggle = this.state.toggle;
    let bg;
    let cmdButton;

    if (toggle) {
      bg = React.createElement(Commands);
      cmdButton = (
        <a
          className="button5 toggled"
          href="#commands"
          onClick={this.handleCommandClick}
        >
          <img id="2" alt="" className="icon" src={listIcon} />{" "}
          <div className="button5 center"> Back </div>
        </a>
      );
    } else {
      bg = (
        <div className="bg">
          <img alt="" src={this.randomImg()} />
        </div>
      );
      cmdButton = (
        <a
          className="button5 white"
          href="#title"
          onClick={this.handleCommandClick}
        >
          <img id="2" alt="" className="icon" src={listIcon} />{" "}
          <div className="button5 center"> Commands </div>
        </a>
      );
    }
    return (
      <div>
        <div className="header1" id="title">
          <p className="p1S1">KAIKIBOT</p>
          <p className="p1S2">Your dad isn't this cool</p>
          <a className="button5" href="https://discord.gg/8G3AqjnFfX">
            <img id="4" alt="" className="icon" src={discordIcon} />{" "}
            <div className="button5 center"> Support</div>
          </a>
          {cmdButton}
          <a className="button5" href="https://embed.kaikibot.xyz/">
            <img id="3" alt="" className="icon" src={embedIcon} />{" "}
            <div className="button5 center"> Embeds </div>
          </a>
          <a
            className="button5"
            href="https://discord.com/oauth2/authorize?client_id=714695773534814238&scope=bot"
          >
            <img id="1" alt="" className="icon" src={inviteIcon} />{" "}
            <div className="button5 center"> Invite </div>
          </a>
          <a
            className="button5 gitlab"
            href="https://gitlab.com/cataclym/KaikiDeishuBot"
          >
            <img id="5" alt="" className="icon" src={gitLabIcon} />{" "}
            <div className="button5 center"> GitLab </div>
          </a>
          <a className="button5 paypal" href={ppLink}>
            <img id="5" alt="" className="icon" src={paypal} />
            <div className="button5 center"> Donate </div>
          </a>
          <a className="button5 patreon" href={patreonLink}>
            <img id="5" alt="" className="icon" src={patreon} />{" "}
            <div className="button5 center"> Patreon </div>
          </a>
        </div>
        {bg}
        <p className="footer">© cata 2021</p>
        <p
          style={{
            alignContent: "center",
            textAlign: "center",
            margin: "auto",
            marginTop: "1vw",
            width: 400,
            color: "white",
          }}
        >
          <a
            style={{
              textDecoration: "none",
              color: "cornflowerblue",
            }}
            href="https://www.streamlinehq.com"
          >
            Free vectors icons and illustrations from Streamline
          </a>
        </p>
      </div>
    );
  }

  randomImg() {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }
}
