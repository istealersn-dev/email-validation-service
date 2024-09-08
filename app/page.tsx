'use client'

import { SearchBox } from "./components/SearchBox/SearchBox";

export default function Home() {
  const handleSearch = (searchTerm: string) => {
    console.log('Performing the search', searchTerm)
  }
  return (
    <main>
      <SearchBox onSearch={handleSearch}/>
    </main>
  );
}
