import React from "react";
import { PasswordGeneratorProps } from "./PasswordGenerator.types";
import { Checkbox } from "@/components/ui/checkbox";


export  function PasswordGenerator(props:PasswordGeneratorProps) {
  
    const {
        setLengthPassword,
        lengthPassword,
        isMayusSelected,
        setIsMayusSelected,
        isMinusSelected,
        setIsMinusSelected,
        isSpecialCharacters,
        setIsSpecialCharacters,
        isNumberSelected,
        setIsNumberSelected
    } = props

    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLengthPassword(Number(event.target.value))
    }


  return (
    <div>
        <>
            <div className="w-full p-4 bg-slate-100 rounded-md shadow-md flex gap-2 items-center">
                <label className="block text-sm font-medium text-gray-700 min-w-32">Longitud: {lengthPassword}</label>
                <input type="range"  id="range" min="9" max="50" className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer" value={lengthPassword} onChange={handleRangeChange} />
            </div>
            <div>
                <div className="flex items-center space-x-2 my-4 bg-slate-100 rounded-md shadow-md p-4">
                    <Checkbox id="mayus" checked={isMayusSelected} onCheckedChange={()=> setIsMayusSelected((prev) => !prev)}/>
                        <label htmlFor="mayus" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Mayusculas A-Z
                        </label>
                </div>
                <div className="flex items-center space-x-2 my-4 bg-slate-100 rounded-md shadow-md p-4">
                    <Checkbox id="minus" checked={isMinusSelected} onCheckedChange={()=> setIsMinusSelected((prev) => !prev)}/>
                        <label htmlFor="minus" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                           Minusculas a-z
                        </label>
                </div>
                <div className="flex items-center space-x-2 my-4 bg-slate-100 rounded-md shadow-md p-4">
                    <Checkbox id="number" checked={isNumberSelected} onCheckedChange={()=> setIsNumberSelected((prev) => !prev)}/>
                        <label htmlFor="number" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                           Numeros 0-9
                        </label>
                </div>
                <div className="flex items-center space-x-2 my-4 bg-slate-100 rounded-md shadow-md p-4">
                    <Checkbox id="special" checked={isSpecialCharacters} onCheckedChange={()=> setIsSpecialCharacters((prev) => !prev)}/>
                        <label htmlFor="special" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                           Caracteres: !#@/?¡*
                        </label>
                </div>
            </div>
        </>
    </div>
  )
}
