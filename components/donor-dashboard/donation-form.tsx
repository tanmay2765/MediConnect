"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle } from "lucide-react"

interface DonationFormProps {
  donorId: string
  onSuccess?: () => void
}

export function DonationForm({ donorId, onSuccess }: DonationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    unit: "tablets",
    expiryDate: "",
    batchNumber: "",
    manufacturer: "",
    city: "",
    state: "",
    pincode: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/medicines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorId,
          ...formData,
          quantity: Number.parseInt(formData.quantity),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to create donation")
      }

      setSuccess("Medicine donation created successfully!")
      setFormData({
        name: "",
        description: "",
        quantity: "",
        unit: "tablets",
        expiryDate: "",
        batchNumber: "",
        manufacturer: "",
        city: "",
        state: "",
        pincode: "",
      })

      setTimeout(() => {
        onSuccess?.()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create donation")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donate Medicine</CardTitle>
        <CardDescription>Fill in the details of the medicine you want to donate</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              <CheckCircle className="w-4 h-4" />
              {success}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Medicine Name *</label>
              <Input name="name" placeholder="e.g., Aspirin" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Manufacturer</label>
              <Input
                name="manufacturer"
                placeholder="e.g., Pharma Co"
                value={formData.manufacturer}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Describe the medicine and its uses"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity *</label>
              <Input
                name="quantity"
                type="number"
                placeholder="100"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Unit</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
              >
                <option value="tablets">Tablets</option>
                <option value="capsules">Capsules</option>
                <option value="ml">ML</option>
                <option value="grams">Grams</option>
                <option value="units">Units</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Expiry Date *</label>
              <Input name="expiryDate" type="date" value={formData.expiryDate} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Batch Number</label>
            <Input
              name="batchNumber"
              placeholder="e.g., BATCH001"
              value={formData.batchNumber}
              onChange={handleChange}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">City *</label>
              <Input name="city" placeholder="Mumbai" value={formData.city} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">State *</label>
              <Input name="state" placeholder="Maharashtra" value={formData.state} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Pincode *</label>
              <Input name="pincode" placeholder="400001" value={formData.pincode} onChange={handleChange} required />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating donation..." : "Create Donation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
