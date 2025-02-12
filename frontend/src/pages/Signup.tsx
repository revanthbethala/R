import { SignUp } from "@clerk/clerk-react";
import React from "react";

function Signup() {
  return (
    <div>
      <SignUp signInUrl="/login" forceRedirectUrl={"/"} />
    </div>
  );
}

export default Signup;
