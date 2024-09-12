"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { Element } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Copy, MoreHorizontal, User } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColumnProps = Element;

export const columns: ColumnDef<ColumnProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "typeElement",
    header: "Type Element",
  },
  {
    accessorKey: "urlWebsite",
    header: "Url WebSite",
  },
  {
    accessorKey: "directory",
    header: "Directory",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell:({row}) => {
        const password = row.original.password;
        const username = row.original.username;

        const onEditElement = () => {
           window.location.href = `/element/${row.original.id}`;
        }

        const copyItemClipboard = (item: string, name:string) => {
            navigator.clipboard.writeText(item).then(() => {
                toast({
                    title: `${name} copiado ✅`
                })
            })
        }

        return (
            <div className="flex gap-2 justify-center items-center">
                {password && (
                    <Copy className="w-4 h-4 cursor-pointer" onClick={()=> copyItemClipboard(password, "Password") }/>
                )}
                {username && (
                    <User className="w-4 h-4 cursor-pointer" onClick={()=> copyItemClipboard(username, "Username") } />
                )}

                <DropdownMenu>
                    <DropdownMenuTrigger>
                    <span className="sr-only">Open Menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={onEditElement}>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )
    }
  },
]


