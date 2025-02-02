import { useUser } from "@clerk/clerk-react";
import Logo from "./Logo";
import useUserPreferencesStore from "@/store/useUserPreferencesStore";
import { usePDF } from "react-to-pdf";
export default function Certificate() {
  const { user } = useUser();
  const userName = user?.fullName;
  const { toPDF, targetRef } = usePDF({ filename: `${userName}.pdf` });
  const { formData } = useUserPreferencesStore();
  const { domain1, domain2 } = formData;
  return (
    <div className="flex flex-col h-screen justify-center">
      <div
        id={"assesmentCertificate"}
        className="w-full max-w-3xl mx-auto p-8 bg-white border-8 border-blue-500 h-fit"
        ref={targetRef}
      >
        <div className="flex flex-col items-start justify-start space-y-8 ">
          <Logo />
          <div className="w-full flex items-center ">
            <img
              src="/placeholder.svg"
              alt="Gold M"
              className="w-30 h-30 object-contain pr-8"
            />
            <h2 className="text-4xl font-bold text-gray-900">
              CERTIFICATE OF COMPLETION
            </h2>
          </div>
          <div className="text-center space-y-12 w-full">
            <div className="space-y-6">
              <p className="text-xl text-gray-700 text-center">
                THIS CERTIFICATE IS PROUDLY PRESENTED TO
              </p>
              <h3 className="text-5xl font-bold font-Inter tracking-wide text-gray-900 py-3 border-b-2 border-gray-300">
                {userName}
              </h3>
            </div>

            <p className="text-xl text-gray-700 flex flex-col gap-2 uppercase">
              FOR THE SUCCESSFUL COMPLETION OF
              <h5 className="font-semibold text-2xl">
                BASICS IN {domain1} and {domain2}
              </h5>
            </p>
          </div>
        </div>
      </div>
      <button onClick={() => toPDF()}>Download Certificate </button>
    </div>
  );
}
