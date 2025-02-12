import Logo from "@/myComponents/Logo";
import { SignIn } from "@clerk/clerk-react";

function Login() {
  return (
    <section className="h-screen px-6 bg-gradient-to-bl from-blue-200 via-sky-500 to-gray-200">
      <div className="flex justify-center pb-16">
        <Logo />
      </div>
      <div className="flex items-center justify-center lg:justify-around  ">
        <div className="w-1/2 h-1/2 flex items-center justify-center">
          <img
            src="src/assets/loginImg.jpg"
            alt="login"
            className="w-fit h-fit"
          />
        </div>
        <div>
          <SignIn signUpUrl="/signup" forceRedirectUrl="/" />
        </div>
      </div>
    </section>
  );
}

export default Login;
