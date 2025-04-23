

import { useState } from "react";
import Login from "./login";
import Register from "./register";

const Setting = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
        <h2 className="text-center mb-4">Setting Admin</h2>
        {isLogin ? (
          <Login onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <Register onSwitchToLogin={() => setIsLogin(true)} />
        )}
    {/* //   </div> */}
    {/* // </div> */}
   </>
  );
};

export default Setting;
