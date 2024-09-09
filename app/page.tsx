'use client'

import { useState } from "react";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { Results } from "./components/Results/Results";

interface mxResultProps {
  success: boolean;
  domain: string
  mxRecordsWithIPs: {
    host: string;
    ips: string[];
  }[];
  message: string;
}

export default function Home() {

  const [mxResult, setmxResult] = useState<mxResultProps>()

  const handleSearch = async (searchTerm: string) => {
    console.log('Performing the search', searchTerm)
    
    try {
      const response = await fetch('/api/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: searchTerm }),
      })
  
      const result: mxResultProps = await response.json();
      setmxResult(result)
    } catch (error) { // Handle errors
      console.log('Error fetching data: ', error)
      setmxResult({ 
        success: false,
        domain: '',
        mxRecordsWithIPs: [],
        message: 'Failed to fetch data.'
      }); 
    }
  }
  return (
    <main>
      <SearchBox onSearch={handleSearch}/>
      {mxResult && <Results mxResult={mxResult}/>}
    </main>
  );
}
