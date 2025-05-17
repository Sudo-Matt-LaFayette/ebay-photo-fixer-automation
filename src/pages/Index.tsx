
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import PhotoUploader from '../components/PhotoUploader';
import ListingSelector from '../components/ListingSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState<'login' | 'upload' | 'select'>('login');
  const [photos, setPhotos] = useState<{ id: string, file: File, preview: string, corrected: string }[]>([]);
  const [selectedListings, setSelectedListings] = useState<string[]>([]);
  const { toast } = useToast();

  const handleLogin = (username: string, password: string) => {
    // Simulate login - in a real app, this would call an API
    console.log(`Login attempt with ${username}`);
    setTimeout(() => {
      setIsLoggedIn(true);
      setStep('upload');
      toast({
        title: "Login Successful",
        description: "You have successfully logged into your eBay account.",
      });
    }, 1500);
  };

  const handlePhotosUploaded = (newPhotos: { id: string, file: File, preview: string, corrected: string }[]) => {
    setPhotos([...photos, ...newPhotos]);
    if (newPhotos.length > 0) {
      setStep('select');
      toast({
        title: "Photos Processed",
        description: `${newPhotos.length} photo(s) have been processed and orientation corrected.`,
      });
    }
  };

  const handleListingsSelected = (listings: string[]) => {
    setSelectedListings(listings);
    toast({
      title: "Photos Updated",
      description: `Successfully updated ${listings.length} listing(s) with corrected photos.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-ebay-primary">eBay Photo Fixer</h1>
          </div>
          {isLoggedIn && (
            <div className="flex items-center space-x-4">
              <span className="text-green-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Logged In
              </span>
              <button 
                onClick={() => {
                  setIsLoggedIn(false);
                  setStep('login');
                  setPhotos([]);
                  setSelectedListings([]);
                }} 
                className="text-sm text-gray-600 hover:text-ebay-primary"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Progress Steps */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 'login' ? 'bg-ebay-primary text-white' : (isLoggedIn ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600')}`}>
                1
              </div>
              <div className="ml-4 flex-1">
                <h2 className={`text-sm font-medium ${step === 'login' ? 'text-ebay-primary' : (isLoggedIn ? 'text-green-600' : 'text-gray-600')}`}>
                  Login to eBay
                </h2>
              </div>
              <div className="h-px flex-1 bg-gray-200 mx-4"></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 'upload' ? 'bg-ebay-primary text-white' : (photos.length > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600')}`}>
                2
              </div>
              <div className="ml-4 flex-1">
                <h2 className={`text-sm font-medium ${step === 'upload' ? 'text-ebay-primary' : (photos.length > 0 ? 'text-green-600' : 'text-gray-600')}`}>
                  Upload Photos
                </h2>
              </div>
              <div className="h-px flex-1 bg-gray-200 mx-4"></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 'select' ? 'bg-ebay-primary text-white' : (selectedListings.length > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600')}`}>
                3
              </div>
              <div className="ml-4">
                <h2 className={`text-sm font-medium ${step === 'select' ? 'text-ebay-primary' : (selectedListings.length > 0 ? 'text-green-600' : 'text-gray-600')}`}>
                  Update Listings
                </h2>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6">
            {step === 'login' && (
              <LoginForm onLogin={handleLogin} />
            )}
            
            {isLoggedIn && (
              <Tabs defaultValue={step === 'upload' ? 'upload' : 'select'} className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger 
                    value="upload" 
                    onClick={() => setStep('upload')}
                    className="data-[state=active]:bg-ebay-primary data-[state=active]:text-white"
                  >
                    Upload Photos
                  </TabsTrigger>
                  <TabsTrigger 
                    value="select" 
                    onClick={() => setStep('select')}
                    className="data-[state=active]:bg-ebay-primary data-[state=active]:text-white"
                  >
                    Select Listings
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload">
                  <PhotoUploader onPhotosProcessed={handlePhotosUploaded} />
                </TabsContent>
                
                <TabsContent value="select">
                  <ListingSelector 
                    photos={photos} 
                    onListingsSelected={handleListingsSelected}
                  />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            eBay Photo Fixer Automation Tool — Not affiliated with eBay Inc.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
