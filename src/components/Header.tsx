import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { NavMenu } from './NavMenu';
import type { User } from '../types';

type HeaderProps = {
  name: User['name'];
};

export const Header = ({ name }: HeaderProps) => {
  return (
    <header className="bg-gray-800 py-5">
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
        <Link to="/" className="w-64">
          <Logo />
        </Link>
        <NavMenu name={name} />
      </div>
    </header>
  );
};
