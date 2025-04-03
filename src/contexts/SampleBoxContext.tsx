
import { createContext, useState, useContext, ReactNode } from "react";
import { Sandwich } from "@/types/sandwich";

// Extend the Sandwich type to include quantity
interface SandwichWithQuantity extends Sandwich {
  quantity: number;
}

interface SampleBoxContextType {
  sampleBox: SandwichWithQuantity[];
  addToSampleBox: (sandwich: Sandwich, quantity?: number) => void;
  removeFromSampleBox: (sandwichId: string) => void;
  clearSampleBox: () => void;
  isSampleBoxFull: boolean;
  isInSampleBox: (sandwichId: string) => boolean;
  getSandwichQuantity: (sandwichId: string) => number;
  updateSandwichQuantity: (sandwichId: string, quantity: number) => void;
  getRemainingCapacity: () => number;
  openSampleRequestForm: boolean;
  setOpenSampleRequestForm: (open: boolean) => void;
}

const SampleBoxContext = createContext<SampleBoxContextType | undefined>(undefined);

export const SampleBoxProvider = ({ children }: { children: ReactNode }) => {
  const [sampleBox, setSampleBox] = useState<SandwichWithQuantity[]>([]);
  const [openSampleRequestForm, setOpenSampleRequestForm] = useState(false);
  
  const MAX_SAMPLES = 10;
  
  // Calculate the total quantity of all sandwiches in the box
  const totalQuantity = sampleBox.reduce((sum, sandwich) => sum + sandwich.quantity, 0);
  
  // Get the remaining capacity in the sample box
  const getRemainingCapacity = () => MAX_SAMPLES - totalQuantity;
  
  // Add sandwich to sample box with quantity
  const addToSampleBox = (sandwich: Sandwich, quantity: number = 1) => {
    // Don't add if it would exceed the maximum
    if (totalQuantity + quantity > MAX_SAMPLES) {
      return;
    }
    
    // Check if sandwich already exists in the box
    const existingIndex = sampleBox.findIndex(item => item.id === sandwich.id);
    
    if (existingIndex >= 0) {
      // Update quantity of existing sandwich
      const updatedSampleBox = [...sampleBox];
      updatedSampleBox[existingIndex].quantity += quantity;
      setSampleBox(updatedSampleBox);
    } else {
      // Add new sandwich with quantity
      setSampleBox(prev => [...prev, { ...sandwich, quantity }]);
    }
    
    // Automatically open the sample request form when the box is full
    if (totalQuantity + quantity >= MAX_SAMPLES) {
      setOpenSampleRequestForm(true);
    }
  };
  
  // Remove sandwich from sample box by ID
  const removeFromSampleBox = (sandwichId: string) => {
    setSampleBox(prev => prev.filter(item => item.id !== sandwichId));
    
    // Close the form if it was open and we're removing items
    if (openSampleRequestForm) {
      setOpenSampleRequestForm(false);
    }
  };
  
  // Clear the entire sample box
  const clearSampleBox = () => {
    setSampleBox([]);
    setOpenSampleRequestForm(false);
  };
  
  // Check if a sandwich is already in the sample box
  const isInSampleBox = (sandwichId: string) => {
    return sampleBox.some(item => item.id === sandwichId);
  };

  // Get the quantity of a specific sandwich in the box
  const getSandwichQuantity = (sandwichId: string) => {
    const sandwich = sampleBox.find(item => item.id === sandwichId);
    return sandwich ? sandwich.quantity : 0;
  };
  
  // Update the quantity of a sandwich already in the box
  const updateSandwichQuantity = (sandwichId: string, quantity: number) => {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      removeFromSampleBox(sandwichId);
      return;
    }
    
    const existingSandwich = sampleBox.find(item => item.id === sandwichId);
    if (!existingSandwich) return;
    
    const otherSandwichesQuantity = totalQuantity - existingSandwich.quantity;
    
    // Check if new quantity would exceed the maximum
    if (otherSandwichesQuantity + quantity > MAX_SAMPLES) {
      return;
    }
    
    setSampleBox(prev => prev.map(item => 
      item.id === sandwichId ? { ...item, quantity } : item
    ));
  };
  
  const isSampleBoxFull = totalQuantity >= MAX_SAMPLES;
  
  return (
    <SampleBoxContext.Provider
      value={{
        sampleBox,
        addToSampleBox,
        removeFromSampleBox,
        clearSampleBox,
        isSampleBoxFull,
        isInSampleBox,
        getSandwichQuantity,
        updateSandwichQuantity,
        getRemainingCapacity,
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
