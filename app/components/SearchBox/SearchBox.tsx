"use client";

import { useState } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

/**
 * A reusable search box component that validates email addresses.
 *
 * @param {function} onSearch - A callback function to handle the search query.
 * @return {JSX.Element} The search box component.
 */

export const SearchBox = ({ onSearch }: SearchBoxProps): JSX.Element => {

    const [query, setQuery] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);

            // Clear error if input is not empty
            if (query.trim() === '') {
                setError(null);
                return
            }

            // Clear error if input is not a valid email
            if (!emailPattern.test(query)) {
                setError(null);
                return
            }
    };

        /**
     * Handles the form submission event by validating the email address and triggering the search query.
     *
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     * @return {Promise<void>} No return value, but triggers the onSearch callback with the validated query.
     */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      if (query.trim() === '') {
        setError('Email address cannot be empty.');
        return;
      }

      if (!emailPattern.test(query)) {
        setError('Please enter a valid email address.');
        return
      }

      onSearch(query);
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
        {error && <div className="text-red-500">{error}</div>}
        </div>
        <div className="grid place-content-center mt-10">
            <button 
                type="submit" 
                className="text-base font-semibold w-60 h-12 rounded-lg border-none cursor-pointer bg-foreground text-background transition transform duration-300 ease-in hover:text-foreground hover:bg-background hover:border-2 hover:border-solid hover:border-stone-400 hover:transform hover:-translate-y-1 active:transform active:translate-y-0 active:bg-black">
                    Search
                </button>
        </div>
      </form>
    </section>
  );
};
