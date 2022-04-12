import React from 'react';
import PropTypes from 'prop-types';

const NavRegister = ({ items }) => {
  const navItems = items.map((item) =>
    item ? (
      <div className="rounded-full w-3 h-3 mx-2 bg-prusian-blue" />
    ) : (
      <div className="rounded-full w-3 h-3 mx-2 bg-marigold" />
    )
  );

  return (
    <div className="flex flex-row justify-center ">{navItems}</div>
  );
};

NavRegister.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
};

export default NavRegister;
