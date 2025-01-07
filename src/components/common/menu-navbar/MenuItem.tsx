import React, { ButtonHTMLAttributes } from 'react'

import { Link } from 'react-router-dom'

export interface IMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  description: string;
  to: string;
}

const MenuItem: React.FC<IMenuItemProps> = ({ title, description, to }) => {
  return (
    <div className="py-2">
      <h2 className="mb-2 font-semibold text-lg">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <Link
        to={to}
        className="text-sm text-blue-600 hover:underline"
      >
        Go to {title}
      </Link>
    </div>
  )
}

export default MenuItem
