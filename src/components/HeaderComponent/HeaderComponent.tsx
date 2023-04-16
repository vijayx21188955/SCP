import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>({});
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    let isLogin: any = localStorage.getItem("userInfo");
    if (isLogin) {
      setUserInfo(JSON.parse(isLogin));
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3 d-flex justify-content-between">
      <div className="navbar-brand ms-2">
        Hello, {userInfo.UserName}
      </div>
      <button className='btn btn-sm btn-danger me-2' onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default HeaderComponent;
