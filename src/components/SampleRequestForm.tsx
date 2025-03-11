import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
export interface SampleRequestFormProps {
  onSuccess?: () => void;
}
export const SampleRequestForm = ({
  onSuccess
}: SampleRequestFormProps) => {
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    memberCount: "",
    comments: ""
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Insert data into Supabase
      const {
        data,
        error
      } = await supabase.from("sample_requests").insert([{
        company_name: formData.companyName,
        contact_person: formData.contactPerson,
        email: formData.email,
        phone: formData.phone || null,
        // Convert empty string to null
        member_count: formData.memberCount || null,
        // Convert empty string to null
        comments: formData.comments || null // Convert empty string to null
      }]);
      if (error) {
        console.error("Error submitting form:", error);
        throw error;
      }
      console.log("Form submitted successfully:", data);
      toast({
        title: "Aanvraag verzonden!",
        description: "We nemen binnen 24 uur contact met je op.",
        variant: "default"
      });

      // Reset form
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        memberCount: "",
        comments: ""
      });

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Er is iets misgegaan",
        description: "Probeer het later opnieuw of neem contact met ons op.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-orange-600 mb-4 md:text-4xl">Proef het zelf!</h2>
            <p className="text-lg text-gray-700">Vul het formulier in en ontvang een gratis proefpakket met</p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-xl border border-orange-100">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Bedrijfsnaam / Verenigingsnaam *
                  </label>
                  <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Naam van uw bedrijf of vereniging" autoComplete="organization" />
                </div>

                <div>
                  <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
                    Contactpersoon *
                  </label>
                  <input type="text" id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Naam contactpersoon" autoComplete="name" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mailadres *
                  </label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="voorbeeld@bedrijf.nl" autoComplete="email" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefoonnummer (aanbevolen)
                  </label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="06 12345678" autoComplete="tel" />
                </div>

                <div>
                  <label htmlFor="memberCount" className="block text-sm font-medium text-gray-700 mb-1">
                    Aantal leden/werknemers
                  </label>
                  <input type="text" id="memberCount" name="memberCount" value={formData.memberCount} onChange={handleChange} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Bijv. 25-50" />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                    Opmerkingen / Speciale wensen
                  </label>
                  <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none" placeholder="Eventuele opmerkingen of speciale wensen..."></textarea>
                </div>
              </div>

              <div className="mt-8">
                <Button type="submit" className="w-full py-3 px-6 text-white bg-orange-600 hover:bg-orange-700 rounded-md text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-70" disabled={isSubmitting}>
                  {isSubmitting ? "Even geduld..." : "Ontvang mijn proefpakket"}
                </Button>
              </div>
            </form>

            <div className="mt-10">
              <div className="flex items-center mb-6">
                <div className="w-full h-px bg-gray-200"></div>
                <span className="px-4 text-gray-500 text-sm whitespace-nowrap">VERTROUWD DOOR</span>
                <div className="w-full h-px bg-gray-200"></div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 opacity-70">
                <img src="/lovable-uploads/4fefac10-95b4-48cb-9830-baa771465b58.png" alt="Klant logo" className="h-12 object-contain" />
                <img src="/lovable-uploads/db33a145-159d-4728-a644-cc0bb87b846d.png" alt="Klant logo" className="h-12 object-contain" />
                <img src="/lovable-uploads/79d889cb-83a2-4a42-9c5a-d6f011e80a0a.png" alt="Klant logo" className="h-12 object-contain" />
              </div>
            </div>

            <div className="mt-6 flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">
                  Je ontvangt na aanvraag direct een bevestigingsmail met meer informatie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};