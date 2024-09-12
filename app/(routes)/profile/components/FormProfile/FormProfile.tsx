"use client"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { FormProfileProps } from "./FormProfile.types";
import {formSchema} from './FormProfile.form'
import Image from "next/image"
import { useState } from "react"
import { UploadButton } from "@/lib/uploadThing"
import { Upload } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import axios from "axios"
import { useRouter } from "next/navigation"

export  function FormProfile(props: FormProfileProps) {
  
    const {user} = props
    const router = useRouter()

    const [showUploadPhoto, setShowUploadPhoto] = useState(false)
    const [photoUploaded, setPhotoUploaded] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: user.name || "",
          email: user.email || "",
          profileImage: user.profileImage || "",
          username: user.username || "",
          id: user.id,
        },
      })
     
      
      const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
          await axios.patch("/api/profile",values)
          toast({
            title: "Perfil actualizado ✌️"
          })

          router.refresh()
          setShowUploadPhoto(false)
          setPhotoUploaded(false)

        } catch (error) {
          toast({
            title: "Algo salio mal",
            variant: "destructive"
          })
        }
      }

  return (
    <div className="max-w-lg">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <div>
                  <div className="flex gap-2 items-center">
                    <Image src={user.profileImage ? user.profileImage : '/images/default-profile.jpg'} alt="Image profile" width={60} height={60} className="rounded-full" />
                    <div className="w-[200px]">
                        {showUploadPhoto ? (
                         <UploadButton
                         className="rounded-md text-slate-800 bg-slate-200 mt-3"
                         {...field}
                         endpoint="profileImage" // Asegúrate de que este coincida
                         onClientUploadComplete={(res) => {
                           if (res && res.length > 0) {
                             form.setValue("profileImage", res?.[0].url);
                             setPhotoUploaded(true);
                           } else {
                             console.error("No se recibió un archivo válido.");
                           }
                         }}
                         onUploadError={(error: Error) => {
                           console.log("Error al subir la imagen:", error);
                         }}
                       />
                        ) :(
                          <Button onClick={()=> setShowUploadPhoto((prev)=> !prev)}>
                            <Upload className="mr-2 w-4 h-4" /> Subir Foto
                          </Button>
                        )}
                    </div>
                  </div>
                  {photoUploaded && (
                    <p className="text-sm">Imagen subida</p>
                  )}
                </div>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Coder" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="@coder" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
    </div>
  )
}
