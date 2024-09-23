import React from "react";
import Footer from "../Components/Footer";

const TermsAndConditions = () => {
  return (
    <>
      <div className=" mx-auto min-h-[80vh]">
        <div className="text-3xl font-bold p-5 flex justify-center bg-[#0018b7] text-white mx-auto">
          Terms and Conditions
        </div>

        <div className="max-w-5xl mt-10 mx-auto">
          <p>
            Welcome to BlogifyHub! By using our website, you agree to comply
            with and be bound by the following terms and conditions of use.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the BlogifyHub website, you agree to these
            Terms and Conditions. If you do not agree to these terms, please do
            not use this website.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">2. User Conduct</h2>
          <p>
            You agree not to engage in any activity that interferes with or
            disrupts the services on BlogifyHub, including but not limited to
            uploading viruses, spamming, or hacking.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">
            3. Intellectual Property
          </h2>
          <p>
            All content on BlogifyHub is protected by copyright and other
            intellectual property laws. You may not copy, distribute, or
            reproduce content without written permission from BlogifyHub.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">
            4. Modifications to Terms
          </h2>
          <p>
            BlogifyHub reserves the right to change these Terms and Conditions
            at any time. Changes will be effective upon posting on this page.
          </p>

          <p className="mt-4">
            If you have any questions about these Terms and Conditions, please
            contact us.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
