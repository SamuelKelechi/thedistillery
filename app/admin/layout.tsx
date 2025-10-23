'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passkey, setPasskey] = useState('');

  useEffect(() => {
    const key = localStorage.getItem('admin_passkey');
    if (key === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      setIsAuthorized(true);
    }
  }, []);

  const handleLogin = () => {
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      localStorage.setItem('admin_passkey', passkey);
      setIsAuthorized(true);
    } else {
      Swal.fire({
            icon: "error",
            title: "Invalid Passkey",
            text: "Input Valid Passkey to Access Admin Page",
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_passkey');
    setIsAuthorized(false);
  };

  if (!isAuthorized) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-card">
          <h1>🔒 Admin Access</h1>
          <input
            type="password"
            placeholder="Enter admin passkey"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h2>Admin Dashboard</h2>
        <div style={{display:'flex', gap:'15px'}}>
            <Link href='/admin' style={{color:'white', textDecoration:'none'}}>Upload Product</Link>
            <Link href='/admin/categories' style={{color:'white', textDecoration:'none'}}>Create Category</Link>
            <Link href='/admin/orders' style={{color:'white', textDecoration:'none'}}>View Orders</Link>
        </div>
        <div style={{display:'flex', gap:'15px'}}> 
            {/* <input placeholder='Search Product to Edit'/> */}
            <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="admin-content">{children}</main>
    </div>
  );
}
