"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useEffect, useMemo, useState } from "react";
import { Category } from "@/lib/types";
import { Folder } from "lucide-react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const SearchBar = ({ allCategories }: { allCategories: Category[] }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const filteredCategories = useMemo(() => {
    const newArry = allCategories.filter(({ name }) => {
      return name.toLocaleLowerCase().includes(input.toLocaleLowerCase());
    });
    return newArry;
  }, [input, allCategories]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyK":
          if (event.ctrlKey) {
            event.preventDefault();
            setDialogOpen(true);
          }
          break;
        case "esc":
          setDialogOpen(false);
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setInput("");
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
      <div
        className="md:max-w-screen border border-primary/15 p-3 rounded-lg cursor-text w-full mx-auto"
        onClick={() => setDialogOpen(true)}
      >
        <div className="md:flex gap-2 items-center hidden justify-between ">
          <div className="flex gap-2 items-center">
            <MagnifyingGlassIcon className="size-4" />
            Search
          </div>
          <kbd className="bg-white/15 p-2 rounded-sm text-sm leading-3">
            Ctrl + K
          </kbd>
        </div>
        <div className="block md:hidden">
          <MagnifyingGlassIcon className="size-4" />
        </div>
      </div>
      <DialogContent className="sm:max-w-[425px] w-full md:max-w-2xl bg-black">
        <div className="flex items-center px-6 py-4 border-b">
          <MagnifyingGlassIcon className="size-4" />
          <Input
            type="text"
            placeholder="Search"
            className="border-none focus-visible:outline-none focus-visible:ring-0 text-base shadow-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="h-[400px] py-4 space-y-4 overflow-y-scroll">
          {input.length !== 0 &&
            filteredCategories.map(({ id, name }) => {
              return (
                <Link
                  href={`/category/${id}`}
                  key={id}
                  className="flex gap-3 border border-primary/15 items-center rounded-xl w-full px-3 py-4 cursor-pointer  bg-black hover:bg-white/15 hover:border-primary/50 transition-all duration-100 ease-linear"
                >
                  <Folder width={20} height={20} /> {name}
                </Link>
              );
            })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
