import React from "react";
import Navbar from "../Navbar";
import Trip from "./Trip";
import Timeline from './StartTimeline'
import './BotConnect.css';
import LotsizeForm from './LotsizeForm'
import InstallMT4 from './InstallMT4'

function BotConnect() {
  return (
    <div className="pageContainer">
      <Navbar />
      <h1 className="head-bottrade">Bot EA</h1>
      <Timeline />
      <LotsizeForm />
      <Trip />
      <InstallMT4 />
    </div>
  );
}

export default BotConnect;
