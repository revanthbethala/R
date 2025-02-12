import { SignUp } from "@clerk/clerk-react";

function Signup() {
  return (
    <div>
      <SignUp signInUrl="/login" forceRedirectUrl="/user-preferences"/>
    </div>
  );
}

export default Signup;
