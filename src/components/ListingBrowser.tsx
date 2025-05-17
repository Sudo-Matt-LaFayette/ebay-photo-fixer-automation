
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data to simulate fetched listings from eBay account
const MOCK_ALL_LISTINGS = [
  { id: 'listing-1', title: 'Vintage Camera Nikon F3 35mm Film SLR', images: 4, updatedAt: '2025-05-15', hasOrientationIssues: true },
  { id: 'listing-2', title: 'Sony PlayStation 5 Console - Disc Version', images: 6, updatedAt: '2025-05-16', hasOrientationIssues: true },
  { id: 'listing-3', title: 'Apple iPhone 14 Pro Max - 256GB - Graphite', images: 8, updatedAt: '2025-05-16', hasOrientationIssues: false },
  { id: 'listing-4', title: 'Nike Air Jordan 1 Retro High OG Size 10', images: 5, updatedAt: '2025-05-14', hasOrientationIssues: true },
  { id: 'listing-5', title: 'Antique Brass Compass Maritime Navigation Tool', images: 3, updatedAt: '2025-05-12', hasOrientationIssues: false },
  { id: 'listing-6', title: 'Vintage Leather Journal Handmade', images: 7, updatedAt: '2025-05-10', hasOrientationIssues: true },
  { id: 'listing-7', title: 'Canon EOS R6 Mirrorless Camera', images: 6, updatedAt: '2025-05-09', hasOrientationIssues: false },
  { id: 'listing-8', title: 'Handmade Ceramic Coffee Mug Set of 4', images: 5, updatedAt: '2025-05-11', hasOrientationIssues: true },
];

interface ListingBrowserProps {
  onListingsSelected: (listings: string[]) => void;
}

const ListingBrowser = ({ onListingsSelected }: ListingBrowserProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState<typeof MOCK_ALL_LISTINGS>([]);
  const [selectedListings, setSelectedListings] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'all' | 'issues'>('issues');
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to fetch listings
    const fetchListings = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setListings(MOCK_ALL_LISTINGS);
        
        const listingsWithIssues = MOCK_ALL_LISTINGS.filter(listing => 
          listing.hasOrientationIssues
        );
        
        if (listingsWithIssues.length > 0) {
          toast({
            title: "Orientation Issues Found",
            description: `Found ${listingsWithIssues.length} listings with potential photo orientation issues.`,
          });
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
        toast({
          title: "Error",
          description: "Failed to fetch your listings. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [toast]);

  const displayedListings = viewMode === 'all' 
    ? listings 
    : listings.filter(listing => listing.hasOrientationIssues);

  const handleSelectListing = (listingId: string) => {
    setSelectedListings(prev => 
      prev.includes(listingId)
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    );
  };

  const handleSelectAll = () => {
    if (selectedListings.length === displayedListings.length) {
      setSelectedListings([]);
    } else {
      setSelectedListings(displayedListings.map(listing => listing.id));
    }
  };

  const handleContinue = () => {
    if (selectedListings.length === 0) {
      toast({
        title: "No Listings Selected",
        description: "Please select at least one listing to continue.",
      });
      return;
    }
    
    onListingsSelected(selectedListings);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Browse Your eBay Listings
        </h2>
        <p className="text-gray-600 mt-1">
          We've scanned your account and identified listings with potential orientation issues
        </p>
      </div>
      
      <Tabs defaultValue={viewMode} onValueChange={(value) => setViewMode(value as 'all' | 'issues')}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="issues" className="data-[state=active]:bg-ebay-primary data-[state=active]:text-white">
            Orientation Issues ({listings.filter(l => l.hasOrientationIssues).length})
          </TabsTrigger>
          <TabsTrigger value="all" className="data-[state=active]:bg-ebay-primary data-[state=active]:text-white">
            All Listings ({listings.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ebay-primary"></div>
                  <span className="ml-3 text-gray-600">Scanning your listings...</span>
                </div>
              ) : displayedListings.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="font-medium">Good news!</p>
                  <p>No listings with orientation issues were found.</p>
                </div>
              ) : (
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Checkbox 
                        id="select-all-issues" 
                        checked={selectedListings.length === displayedListings.length && displayedListings.length > 0}
                        onCheckedChange={handleSelectAll} 
                      />
                      <label htmlFor="select-all-issues" className="ml-2 cursor-pointer">
                        Select All
                      </label>
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedListings.length} of {displayedListings.length} selected
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Listing Title</TableHead>
                        <TableHead className="w-20 text-center">Images</TableHead>
                        <TableHead className="w-32">Last Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {displayedListings.map((listing) => (
                        <TableRow 
                          key={listing.id}
                          className={selectedListings.includes(listing.id) ? 'bg-blue-50' : ''}
                        >
                          <TableCell>
                            <Checkbox 
                              id={`checkbox-${listing.id}`}
                              checked={selectedListings.includes(listing.id)}
                              onCheckedChange={() => handleSelectListing(listing.id)} 
                            />
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{listing.title}</div>
                          </TableCell>
                          <TableCell className="text-center">{listing.images}</TableCell>
                          <TableCell>{listing.updatedAt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button
              onClick={handleContinue}
              disabled={selectedListings.length === 0}
              className="bg-ebay-primary hover:bg-blue-700"
            >
              Fix Selected Listings ({selectedListings.length})
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ebay-primary"></div>
                  <span className="ml-3 text-gray-600">Loading your listings...</span>
                </div>
              ) : (
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Checkbox 
                        id="select-all" 
                        checked={selectedListings.length === displayedListings.length}
                        onCheckedChange={handleSelectAll} 
                      />
                      <label htmlFor="select-all" className="ml-2 cursor-pointer">
                        Select All
                      </label>
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedListings.length} of {listings.length} selected
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Listing Title</TableHead>
                        <TableHead className="w-20 text-center">Images</TableHead>
                        <TableHead className="w-32">Last Updated</TableHead>
                        <TableHead className="w-32 text-center">Issues</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {displayedListings.map((listing) => (
                        <TableRow 
                          key={listing.id}
                          className={selectedListings.includes(listing.id) ? 'bg-blue-50' : ''}
                        >
                          <TableCell>
                            <Checkbox 
                              id={`checkbox-all-${listing.id}`}
                              checked={selectedListings.includes(listing.id)}
                              onCheckedChange={() => handleSelectListing(listing.id)} 
                            />
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{listing.title}</div>
                          </TableCell>
                          <TableCell className="text-center">{listing.images}</TableCell>
                          <TableCell>{listing.updatedAt}</TableCell>
                          <TableCell className="text-center">
                            {listing.hasOrientationIssues ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Needs Fix
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                OK
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button
              onClick={handleContinue}
              disabled={selectedListings.length === 0}
              className="bg-ebay-primary hover:bg-blue-700"
            >
              Fix Selected Listings ({selectedListings.length})
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ListingBrowser;
