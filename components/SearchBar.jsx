"use client0";

import { api } from "@/convex/_generated/api";
import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { City, State } from "country-state-city";
import { Calendar, Loader2, MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";
import { debounce } from "lodash";
import { Button } from "./ui/button";
import { getCategoryIcon } from "@/lib/data";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";
import { Label } from "./ui/label";
import { createLocationSlug } from "@/lib/location";

const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setQuery] = useState("");
  const [selectedState, setState] = useState("");
  const [selectedCity, setCity] = useState("");
  const [location, setLocation] = useState({
    state: "",
    city: "",
    country: "India",
  });
  const [searchResults, setSearchResults] = useState(false);
  const searchRef = useRef(null);

  const { data: currentUser, isLoading } = useConvexQuery(
    api.users.getCurrentUser,
  );

  const { mutate: updateLocation } = useConvexMutation(
    api.users.completeOnboarding,
  );

  const { data: searchResult, isLoading: searchLoading } = useConvexQuery(
    api.search.searchEvents,
    searchQuery.trim().length >= 2 ? { query: searchQuery, limit: 5 } : "skip",
  );

  const indianStates = State.getStatesOfCountry("IN");

  const cities = useMemo(() => {
    if (!selectedState) return [];
    const state = indianStates.find((s) => s.name === selectedState);
    if (!state) return [];
    return City.getCitiesOfState("IN", state.isoCode);
  }, [selectedState, indianStates]);

  useEffect(() => {
    if (currentUser?.location) {
      setState(currentUser?.location?.state || "");
      setCity(currentUser?.location?.city || "");
    }
  }, [currentUser, isLoading]);

  const debouncedSetQuery = useRef(
    debounce((value) => setQuery(value), 300), // calls for every 300ms
  ).current;

  const handleInput = (e) => {
    const val = e.target.value;
    debouncedSetQuery(val);
    setSearchResults(val.length >= 2);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleLocation = async (city, state) => {
    try {
      if (currentUser?.interests && currentUser?.location) {
        await updateLocation({
          location: { city, state, country: "India" },
          interests: currentUser.interests,
        });
      }

      const slug = createLocationSlug(city, state);
      router.push(`/explore/${slug}`);
    } catch (error) {
      console.error("Failed to update location")
    }
  };

  return (
    <div className="flex items-center">
      <div className="relative flex w-full" ref={searchRef}>
        <div className="flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className={"pl-10 w-full h-9 rounded-none rounded-l-md"}
            placeholder="Search Events"
            onFocus={() => {
              if (searchQuery.length >= 2) setSearchResults(true);
            }}
            onChange={handleInput}
          />
        </div>

        {searchResults && (
          <div className="absolute top-full mt-2 w-96 bg-background border rounded-lg shadow-lg z-50 max-h-100 overflow-y-auto">
            {searchLoading ? (
              <div className="p-4 flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
              </div>
            ) : searchResult && searchResult.length > 0 ? (
              <div className="py-2">
                <p className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                  SEARCH RESULTS
                </p>
                {searchResult.map((e) => (
                  <button
                    key={e._id}
                    className="w-full px-4 py-3 hover:bg-muted/50 text-left transition-colors"
                    onClick={() => {
                      setSearchResults(false);
                      setQuery("");
                      router.push(`/events/${e.slug}`);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl mt-0.5">
                        {getCategoryIcon(e.category)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium mb-1 line-clamp-1">
                          {e.title}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(e.startDate, "dd MMM")}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {e.city} || {e.state}
                          </span>
                        </div>
                      </div>

                      {e.ticketType === "free" ? (
                        <Badge className={"text-xs"} variant="secondary">
                          Free
                        </Badge>
                      ) : (
                        <Badge className={"text-xs"} variant="secondary">
                          Paid
                        </Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>

      <Select
        value={selectedState}
        onValueChange={(value) => {
          setState(value);
          setCity("");
        }}
      >
        <SelectTrigger id="state" className="w-32 h-9 border-1-0 rounded-none">
          <SelectValue placeholder="State" />
        </SelectTrigger>
        <SelectContent>
          {indianStates.map((state) => (
            <SelectItem key={state.isoCode} value={state.name}>
              {state.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedCity}
        onValueChange={(value) => {
          setCity(value);
          if (value && selectedState) {
            handleLocation(value, selectedState);
          }
        }}
        disabled={!selectedState}
      >
        <SelectTrigger id="city" className="w-32 h-9 rounded-none rounded-r-md">
          <SelectValue
            placeholder={selectedState ? "Select city" : "State first"}
          />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city.name} value={city.name}>
              {city.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchBar;
