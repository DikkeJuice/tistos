
import { useState } from "react";
import { SampleRequestForm } from "@/components/SampleRequestForm";

const SampleRequest = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <main className="min-h-screen">
      {isSubmitted ? (
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Bedankt voor je aanvraag!</h2>
          <p className="mb-6">
            We hebben je aanvraag ontvangen en zullen zo snel mogelijk contact met je opnemen.
          </p>
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-[#DC5A32] text-white font-medium rounded-md hover:bg-[#C04A22] transition-colors"
          >
            Terug naar de homepagina
          </a>
        </div>
      ) : (
        <SampleRequestForm onSuccess={() => setIsSubmitted(true)} />
      )}
    </main>
  );
};

export default SampleRequest;
