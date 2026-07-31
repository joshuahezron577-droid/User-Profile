"use client";

import { useState, useEffect } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";

export default function HelpSupportPage() {
  const [submitted, setSubmitted] = useState(false);

  // Inapakia Tawk.to kwenye ukurasa huu pekee
  useEffect(() => {
    if (document.getElementById("tawk-to-script")) return;

    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
          s0 = document.getElementsByTagName("script")[0];
      s1.id = "tawk-to-script";
      s1.async = true;
      s1.src = 'https://embed.tawk.to/693347b229e54f197c444fba/1jbo504ou';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1e293b] w-full">
      <div className="flex flex-1 w-full">
        <main className="flex-1 flex items-center justify-center p-6 w-full">
          <div className="w-full max-w-2xl bg-[#2c3e50] p-8 rounded-xl shadow-2xl border border-gray-700">

            <div className="text-center mb-6">
              <h1 className="text-2xl font-extrabold text-white mb-1">Project Management</h1>
              <h2 className="text-sm font-medium text-gray-300">Help &amp; Support</h2>
            </div>

            {submitted ? (
              <div className="p-4 bg-green-600 text-white rounded-lg text-center font-semibold">
                Ujumbe wako umepokelewa kikamilifu! Tutafanyia kazi hivi punde.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username" value="Username" className="text-white font-semibold text-sm mb-2 block" />
                    <TextInput id="username" type="text" placeholder="Weka username yako" required />
                  </div>
                  <div>
                    <Label htmlFor="email" value="Email" className="text-white font-semibold text-sm mb-2 block" />
                    <TextInput id="email" type="email" placeholder="name@example.com" required />
                  </div>
                </div>

                <fieldset className="border border-gray-600 p-4 rounded-lg bg-[#1e293b]/50">
                  <legend className="text-sm font-medium text-white px-2">Inquiry Type</legend>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    {["General Inquiry", "Support", "Feedback", "Other"].map((type) => (
                      <div key={type} className="flex items-center gap-2">
                        <input className="size-4 rounded border-gray-600 text-blue-600 bg-gray-700" type="checkbox" id={type} name="inquiry-type" value={type} />
                        <label className="text-sm text-gray-200" htmlFor={type}>{type}</label>
                      </div>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <Label htmlFor="message" value="Message" className="text-white font-semibold text-sm mb-2 block" />
                  <Textarea id="message" rows="3" placeholder="Andika ujumbe wako hapa..." required className="w-full resize-none rounded-lg bg-white text-gray-900" />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 transition-all">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}