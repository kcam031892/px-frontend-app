import React from 'react';
import logo from 'assets/logo.png';
import { Image } from './Logo.styled';

const Logo: React.FC = () => {
  return <Image src={logo} alt="Audition Magic" />;
};

export default Logo;
