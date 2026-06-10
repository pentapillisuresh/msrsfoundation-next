import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, to, onClick, variant = 'primary', size = 'md', type = 'button', fullWidth = false, className = '' }) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-secondary text-white hover:bg-accent focus:ring-secondary',
    secondary: 'bg-dark text-white hover:bg-secondary focus:ring-dark',
    outline: 'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const width = fullWidth ? 'w-full' : '';
  
  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`;
  
  if (to) {
    return (
      <Link to={to} className={combinedClassName}>
        {children}
      </Link>
    );
  }
  
  return (
    <button onClick={onClick} type={type} className={combinedClassName}>
      {children}
    </button>
  );
};

export default Button;