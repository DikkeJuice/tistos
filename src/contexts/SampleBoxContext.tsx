
import { createContext, useState, useContext, ReactNode } from "react";
import { Sandwich } from "@/types/sandwich";

interface SampleBoxContextType {
  sampleBox: Sandwich[];
  addToSampleBox: (sandwich: Sandwich) => void;
  removeFromSampleBox: (sandwichId: string) => void;
  clearSampleBox: () => void;
  isSampleBoxFull: boolean;
  isInSampleBox: (sandwichId: string) => boolean;
  openSampleRequestForm: boolean;
  setOpenSampleRequestForm: (open: boolean) => void;
}

const SampleBoxContext = createContext<SampleBoxContextType | undefined>(undefined);

export const SampleBoxProvider = ({ children }: { children: ReactNode }) => {
  const [sampleBox, setSampleBox] = useState<Sandwich[]>([]);
  const [openSampleRequestForm, setOpenSampleRequestForm] = useState(false);
  
  const MAX_SAMPLES = 10;
  
  const addToSampleBox = (sandwich: Sandwich) => {
    if (sampleBox.length < MAX_SAMPLES && !isInSampleBox(sandwich.id)) {
      setSampleBox(prev => [...prev, sandwich]);
      
      // Automatically open the sample request form when the box is full
      if (sampleBox.length + 1 === MAX_SAMPLES) {
        setOpenSampleRequestForm(true);
      }
    }
  };
  
  const removeFromSampleBox = (sandwichId: string) => {
    setSampleBox(prev => prev.filter(item => item.id !== sandwichId));
    
    // Close the form if it was open and we're removing items
    if (openSampleRequestForm) {
      setOpenSampleRequestForm(false);
    }
  };
  
  const clearSampleBox = () => {
    setSampleBox([]);
    setOpenSampleRequestForm(false);
  };
  
  const isInSampleBox = (sandwichId: string) => {
    return sampleBox.some(item => item.id === sandwichId);
  };
  
  const isSampleBoxFull = sampleBox.length >= MAX_SAMPLES;
  
  return (
    <SampleBoxContext.Provider
      value={{
        sampleBox,
        addToSampleBox,
        removeFromSampleBox,
        clearSampleBox,
        isSampleBoxFull,
        isInSampleBox,
        openSampleRequestForm,
        setOpenSampleRequestForm
      }}
    >
      {children}
    </SampleBoxContext.Provider>
  );
};

export const useSampleBox = () => {
  const context = useContext(SampleBoxContext);
  if (context === undefined) {
    throw new Error("useSampleBox must be used within a SampleBoxProvider");
  }
  return context;
};
