"use client";
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button'
import { Upload } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


  
  
  const AddDocument = ({categoryId}: {categoryId: string}) => {

    const [file, setFile] = useState<File | null>(null)
    const [documentName ,setDocumentName] = useState<string>("")

    console.log(file)

    const hanelFileChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
if(e.target.files && (e.target.files[0].type === "application/pdf")){
    setFile(e.target.files[0])
}
    }

    return (
        <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className='flex gap-2 flex-col items-center justify-center h-auto m-auto mt-5'>
          <Upload height={35} width={35} />  
          <p className='text-base text-opacity-70'>
          Add Document
            </p> 
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
                Add Document
            </DialogTitle>
            <DialogDescription>
            Would you like to add document in this category ?
            </DialogDescription>
          </DialogHeader>
          <div className='flex flex-col gap-3'>
          <Label htmlFor="doc-name"> Name of the Document</Label> 
          <Input id="doc-name"  type="text" onChange={(e)=>setDocumentName(e.target.value)} />
          <Label htmlFor="picture"> Pdfs only</Label> 
          <Input id="picture" accept='.pdf' type="file" onChange={hanelFileChange} />
          </div>
          <DialogFooter>
            <Button type="submit">
                Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default AddDocument
  