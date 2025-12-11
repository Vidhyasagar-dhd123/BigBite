//a slidebar with toggle button and collapses when clicked outside
import React, { useState, useEffect, useRef } from 'react';
import { SidebarOpen } from 'lucide-react';

const Sidebar = ({children,title}) => {
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClickOutside = (event) => {
    //if sidebarRef is not null and the clicked target is not inside the sidebarRef or buttonRef, close the sidebar
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex items-center'>
      <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        <SidebarOpen />
      </button>
      {isOpen && (
        <div ref={sidebarRef} className='shadow  max-h-screen overflow-y-auto pb-24' style={{ width: '200px', height: '100%', background: '#fff', position: 'absolute', top: 0, left: 0, transition: 'transform 0.3s ease-in-out', zIndex: 1000 }}>
          <div className="font-bold text-lg p-2 border-b">{title}</div>
          {children}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
