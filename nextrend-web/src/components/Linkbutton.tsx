// components/LinkButton.tsx
import React from 'react';
import Link from 'next/link';

interface LinkButtonProps {
  href: string;
  label: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, label }) => {
  return (
    // Utiliza el componente Link para envolver el botón
    <Link href={href}>
      <a>
        <button>{label}</button>
      </a>
    </Link>
  );
};

export default LinkButton;
