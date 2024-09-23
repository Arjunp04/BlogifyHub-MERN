import React from "react";
import Footer from "../Components/Footer";

const PrivacyPolicy = () => {
    return (
      <>
        <div className=" mx-auto min-h-[80vh]">
          <div className="text-3xl font-bold p-5 flex justify-center bg-[#0018b7] text-white mx-auto">
            Privacy Policy
          </div>

          <div className="max-w-5xl mt-10 mx-auto">
            <p>
              At BlogifyHub, we respect your privacy and are committed to
              protecting the personal information you share with us. This
              Privacy Policy outlines how we collect, use, and safeguard your
              data.
            </p>

            <h2 className="text-2xl font-semibold mt-4 mb-2">
              1. Information We Collect
            </h2>
            <p>
              We may collect information such as your name, email address, and
              other contact details when you interact with our site, including
              when you register or subscribe to our newsletter.
            </p>

            <h2 className="text-2xl font-semibold mt-4 mb-2">
              2. How We Use Your Information
            </h2>
            <p>
              We use your information to enhance your experience on BlogifyHub,
              such as personalizing content and communicating updates with you.
            </p>

            <h2 className="text-2xl font-semibold mt-4 mb-2">
              3. Data Security
            </h2>
            <p>
              We take appropriate measures to protect your personal information
              from unauthorized access, disclosure, or alteration.
            </p>

            <h2 className="text-2xl font-semibold mt-4 mb-2">
              4. Changes to this Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We encourage
              you to review this page periodically for any changes.
            </p>

            <p className="mt-4">
              If you have any questions about this Privacy Policy, please
              contact us.
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
};

export default PrivacyPolicy;
