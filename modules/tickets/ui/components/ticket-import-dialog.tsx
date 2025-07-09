'use client'

import { z } from 'zod'
import * as XLSX from 'xlsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


const formSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: 'Veuillez importer un fichier.',
    })
    .refine((files) => {
      if (files.length === 0) return true

      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel', // .xls
        'text/csv', // .csv
      ]

      const allowedExtensions = ['.xlsx', '.xls', '.csv']

      const file = files[0]
      const fileTypeOk = allowedTypes.includes(file.type)
      const fileExtensionOk = allowedExtensions.some(ext =>
        file.name.toLowerCase().endsWith(ext)
      )

      return fileTypeOk && fileExtensionOk
    }, {
      message: 'Veuillez importer un fichier Excel (.xlsx, .xls) ou CSV (.csv).',
    }),
})

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TicketImportDialog({ open, onOpenChange }: Readonly<Props>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { file: undefined },
  })

  const [loading, setLoading] = useState(false)

  const fileRef = form.register('file')

  // Normalise les entêtes (en minuscule et sans espace)
  const normalizeHeader = (header: string) =>
    header.trim().toLowerCase()

const onSubmit = () => {
  const file = form.getValues('file')

  if (file?.[0]) {
    const reader = new FileReader()

    reader.onload = async (e) => {
      const data = e.target?.result
      if (!data) return

      try {
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]

        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' })

        if (jsonData.length === 0) {
          alert('Le fichier est vide.')
          return
        }

        // Vérification de l'entête
        const allowedHeaders = ['contract', 'type', 'motif']
        const fileHeaders = Object.keys(jsonData[0] ?? {}).map(normalizeHeader)

        const validHeaders = fileHeaders.length === 3 &&
          fileHeaders.every(h => allowedHeaders.includes(h))

        if (!validHeaders) {
          alert('Le fichier doit contenir uniquement les colonnes : contract, type, motif.')
          return
        }

        // Préparer les données à envoyer (normalisation des clés)
        const cleanData = jsonData.map((row) => {
          const newRow: any = {}
          Object.keys(row).forEach((key) => {
            const normalizedKey = normalizeHeader(key)
            if (allowedHeaders.includes(normalizedKey)) {
              newRow[normalizedKey] = row[key]
            }
          })
          return newRow
        })

        // Envoi vers l'API
        setLoading(true)

        console.log('cleanData', cleanData)

        const response = await fetch('/api/tickets/bulk-create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cleanData),
        })

        if (response.ok) {
          alert('Importation réussie !')
          onOpenChange(false)
        } else {
          alert('Erreur lors de l importation.')
        }
      } catch (error) {
        console.error('Erreur lors de la lecture du fichier:', error)
        alert('Erreur technique pendant la lecture du fichier.')
      } finally {
        setLoading(false)
      }
    }

    reader.readAsArrayBuffer(file[0])
  }
}


  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val)
        form.reset()
      }}
    >
      <DialogContent className='gap-2 sm:max-w-sm'>
        <DialogHeader className='text-left'>
          <DialogTitle>Import coupure/remise</DialogTitle>
          <DialogDescription>
            Importation rapide de demandes depuis un fichier Excel ou CSV.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id='task-import-form' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='file'
              render={() => (
                <FormItem className='mb-2 space-y-1'>
                  <FormLabel>Fichier</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      {...fileRef}
                      className='h-8'
                      accept='.xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/csv'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className='gap-2'>
          <DialogClose asChild>
            <Button variant='outline' disabled={loading}>Fermer</Button>
          </DialogClose>
          <Button type='submit' form='task-import-form' disabled={loading}>
            {loading ? 'Import en cours...' : 'Importer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
