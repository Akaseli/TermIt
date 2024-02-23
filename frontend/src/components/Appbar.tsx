import React from 'react'
import "./Appbar.css";

interface Props {

}

export const Appbar: React.FC<Props> = () => {
  return(
    <div className="appbar">
      <a href="/" className="logo">
        <p>TermIt</p>
      </a>
    </div>
  );
}