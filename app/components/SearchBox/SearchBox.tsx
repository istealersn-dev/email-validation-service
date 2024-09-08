"use client";

import { useState } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export const SearchBox = ({ onSearch }: SearchBoxProps) => {

    const [query, setQuery] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);

            // Clear error if input is not empty
            if (query.trim() === '') {
                setError(null);
            } else {
                setError(null); // Optionally clear error while typing
            }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (query.trim() === '') {
        setError('Email address cannot be empty.');
        return;
      }

      if (!emailPattern.test(query)) {
        setError('Please enter a valid email address.');
      }

      onSearch(query)
    }

  return (
    <section>
      <form onSubmit={handleSubmit} className="grid place-content-center h-full w-full">
        <div><label htmlFor="search" className="block text-lg pb-2">Validate email</label>
        <input 
            type="text" 
            name="search" 
            id="search"
            value={query} 
            onChange={handleInputChange}
            placeholder="Enter email address"
            autoComplete="off"
            className="text-base w-[30rem] h-[3rem] pl-6 rounded-lg text-background border-none"
        />
        {error && <div className="error-message">{error}</div>}
        </div>
        <div className="grid place-content-center mt-10">
            <button 
                type="submit" 
                className="text-base font-semibold w-60 h-12 rounded-lg border-none cursor-pointer bg-foreground text-background transition transform duration-300 ease-in hover:text-foreground hover:bg-background hover:border-2 hover:border-solid hover:border-stone-400 hover:transform hover:-translate-y-1 active:transform active:translate-y-0 active:bg-black">
                    Validate
                </button>
        </div>
      </form>
    </section>
  );
};
