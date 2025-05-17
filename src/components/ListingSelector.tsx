
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MOCK_LISTINGS = [
  { id: 'listing-1', title: 'Vintage Camera Nikon F3 35mm Film SLR', images: 4, updatedAt: '2025-05-15' },
  { id: 'listing-2', title: 'Sony PlayStation 5 Console - Disc Version', images: 6, updatedAt: '2025-05-16' },
  { id: 'listing-3', title: 'Apple iPhone 14 Pro Max - 256GB - Graphite', images: 8, updatedAt: '2025-05-16' },
  { id: 'listing-4', title: 'Nike Air Jordan 1 Retro High OG Size 10', images: 5, updatedAt: '2025-05-14' },
  { id: 'listing-5', title: 'Antique Brass Compass Maritime Navigation Tool', images: 3, updatedAt: '2025-05-12' },
];

interface ListingSelectorProps {
  photos: { id: string; file: File; preview: string; corrected: string }[];
  onListingsSelected: (listings: string[]) => void;
}

const ListingSelector = ({ photos, onListingsSelected }: ListingSelectorProps) => {
  const [selectedListings, setSelectedListings] = useState<string[]>([]);
  const [updating, setUpdating] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSelectListing = (listingId: string) => {
    setSelectedListings(prev => 
      prev.includes(listingId)
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    );
  };

  const handleSelectAll = () => {
    if (selectedListings.length === MOCK_LISTINGS.length) {
      setSelectedListings([]);
    } else {
      setSelectedListings(MOCK_LISTINGS.map(listing => listing.id));
    }
  };

  const handleUpdate = () => {
    if (selectedListings.length === 0) {
      return;
    }
    
    setUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      onListingsSelected(selectedListings);
      setUpdating(false);
      setCompleted(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {photos.length} Photo{photos.length === 1 ? '' : 's'} Ready for Update
        </h2>
        <p className="text-gray-600 mt-1">
          Select the eBay listings you want to update with your corrected photos
        </p>
      </div>

      {photos.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Photo Preview</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative rounded-md overflow-hidden border border-gray-200">
                <div className="aspect-square">
                  <img 
                    src={photo.corrected} 
                    alt="Corrected" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity">
                  <div className="opacity-0 group-hover:opacity-100 text-white transition-opacity">
                    <div className="text-xs">
                      {photo.file.name.substring(0, 15)}{photo.file.name.length > 15 ? '...' : ''}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-md">
        <Tabs defaultValue="listings">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="listings" className="data-[state=active]:bg-ebay-primary data-[state=active]:text-white">
              Your Listings
            </TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-ebay-primary data-[state=active]:text-white">
              Before/After
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="listings" className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Checkbox 
                  id="select-all" 
                  checked={selectedListings.length === MOCK_LISTINGS.length}
                  onCheckedChange={handleSelectAll} 
                />
                <Label htmlFor="select-all" className="ml-2 cursor-pointer">
                  Select All
                </Label>
              </div>
              <div className="text-sm text-gray-500">
                {selectedListings.length} of {MOCK_LISTINGS.length} selected
              </div>
            </div>
            
            <div className="space-y-2">
              {MOCK_LISTINGS.map((listing) => (
                <div 
                  key={listing.id} 
                  className={`flex items-center border rounded-md p-3 ${
                    selectedListings.includes(listing.id)
                      ? 'border-ebay-primary bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <Checkbox 
                    id={listing.id} 
                    checked={selectedListings.includes(listing.id)}
                    onCheckedChange={() => handleSelectListing(listing.id)} 
                  />
                  <div className="ml-3 flex-grow">
                    <Label htmlFor={listing.id} className="font-medium cursor-pointer">
                      {listing.title}
                    </Label>
                    <div className="text-sm text-gray-500 mt-1">
                      {listing.images} photos • Updated {listing.updatedAt}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button
                onClick={handleUpdate}
                disabled={selectedListings.length === 0 || updating}
                className="bg-ebay-primary hover:bg-blue-700"
              >
                {updating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  `Update ${selectedListings.length} Listing${selectedListings.length === 1 ? '' : 's'}`
                )}
              </Button>
            </div>
            
            {completed && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Successfully updated {selectedListings.length} listing(s) with corrected photos</span>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="comparison" className="p-4">
            <div className="space-y-4">
              {photos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No photos available for comparison
                </div>
              ) : (
                photos.map((photo) => (
                  <Card key={photo.id}>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">{photo.file.name}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Original</p>
                          <div className="border border-gray-200 rounded-md overflow-hidden">
                            <img 
                              src={photo.preview} 
                              alt="Original" 
                              className="w-full h-auto"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Corrected</p>
                          <div className="border border-gray-200 rounded-md overflow-hidden">
                            <img 
                              src={photo.corrected} 
                              alt="Corrected" 
                              className="w-full h-auto"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ListingSelector;
