'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function StatusBanner() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHoursModalOpen, setIsHoursModalOpen] = useState(false)

  useEffect(() => {
    const checkIfOpen = () => {
      const now = new Date()
      const day = now.getDay()
      const hour = now.getHours()
      const minutes = now.getMinutes()
      const currentTime = hour + minutes / 60

      if (day === 0) return false
      
      if (day === 6) {
        return currentTime >= 9 && currentTime < 12
      }

      if (day >= 1 && day <= 5) {
        if (currentTime >= 9 && currentTime < 13) return true
        if (currentTime >= 16 && currentTime < 18) return true
      }

      return false
    }

    const updateOpenStatus = () => {
      setIsOpen(checkIfOpen())
    }

    updateOpenStatus()
    const interval = setInterval(updateOpenStatus, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Dialog open={isHoursModalOpen} onOpenChange={setIsHoursModalOpen}>
      <DialogTrigger asChild>
        <div className={`${isOpen ? 'bg-green-50 text-green-900' : 'bg-blue-50 text-blue-900'} cursor-pointer hover:bg-opacity-90 transition-colors`}>
          <div className="container mx-auto max-w-4xl py-2 px-4 flex items-center justify-center text-center">
            <Clock className={`h-5 w-5 flex-shrink-0 mr-3 ${isOpen ? 'text-green-500' : 'text-[#00a0e3]'}`} />
            <div>
              <p className="font-medium text-lg">
                {isOpen ? 'Abierto ahora' : 'En este momento estamos cerrados'}
              </p>
              <p className={`text-sm ${isOpen ? 'text-green-700' : 'text-blue-700'}`}>
                Hacé click para consultar nuestros horarios
              </p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold mb-4">Horarios de Atención</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 p-3 rounded-md">
              <h3 className="font-medium text-zinc-900">Lunes a Viernes</h3>
              <p className="text-zinc-600">9:00 a 13:00 hs</p>
              <p className="text-zinc-600">16:00 a 18:00 hs</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-md">
              <h3 className="font-medium text-zinc-900">Sábados</h3>
              <p className="text-zinc-600">9:00 a 12:00 hs</p>
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <h3 className="font-medium text-zinc-900">Domingos y Feriados</h3>
            <p className="text-zinc-600">Cerrado</p>
          </div>
          <div className="pt-2 text-center text-sm text-zinc-500">
            Para consultas fuera de horario, puede enviarnos un mensaje por WhatsApp al (261) 123-4567
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 