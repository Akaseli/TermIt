import React from 'react'
import "./GradientButton.css"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | JSX.Element | JSX.Element[]
}

export const GradientButton: React.FC<Props> = ({children, ...props}: Props) => {
  return(
    <button {...props}>
      {children}
    </button>
  );
}