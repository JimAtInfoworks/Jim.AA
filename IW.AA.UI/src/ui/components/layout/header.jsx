import React, { useState, useRef } from 'react';
import { NavLink } from "react-router-dom";

import { StyleClass } from 'primereact/styleclass';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';

export const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const menuRef = useRef(null);

  return (
    <header className="py-4 px-2 text-sm surface-100">
      <div className="flex align-items-center justify-content-between relative lg:static mx-0 px-4 lg:px-8">
        <NavLink to="/" className="flex align-items-center">
          <span className="text-900 font-medium text-2xl line-height-3 mr-6 no-underline">Accelerator</span>
        </NavLink>
        <StyleClass nodeRef={menuRef} selector="@next" enterClassName="hidden" leaveToClassName="hidden" hideOnOutsideClick>
          <i ref={menuRef} className="pi pi-bars text-2xl cursor-pointer block lg:hidden text-700"></i>
        </StyleClass>
        <div className={classNames('align-items-center flex-grow-1 surface-100 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2', { hidden: isHidden })} style={{ top: '100%' }}>
          <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
            <li>
              <NavLink to={"/users"} className="p-ripple flex m-0 px-0 py-3 text-900 font-medium line-height-3 no-underline">
                <span>Users</span>
                <Ripple />
              </NavLink>
            </li>
          </ul>
          <div className="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
            <NavLink to={"/login"}>
              <Button label="Login" className="border-none font-light"></Button>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  )
}