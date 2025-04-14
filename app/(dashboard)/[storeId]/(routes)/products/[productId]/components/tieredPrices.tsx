// components/ui/tiered-prices-input.tsx
"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TieredPrice } from "@prisma/client";

interface Tier {
  minQty: number
  price: number
}

type Row = {
    id: number;
    price: string;
    minQty: string;
  };

interface TieredPricesInputProps {
  value: Tier[]
  onChange: (value: Tier[]) => void
  disabled?: boolean
}

const TieredPricesInput: React.FC<TieredPricesInputProps> = ({ value, onChange, disabled }) => {
//   console.log("init", value)
  const handleChange = (index: number, key: keyof Tier, val: number) => {
    const updated = [...value]
    // console.log("index", index)
    updated[index][key] = val;
    
    onChange(updated)
    // console.log("on change", value)
  }
  const handleAdd = () => {
    onChange([...value, { minQty: 1, price: 0 }])
    // console.log("on add", value)
  }

  const handleRemove = (index: number) => {
    const updated = value.filter((_, i) => i !== index)
    onChange(updated)
    // console.log("on remove", updated)
  }

  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => {
    if (value.length > 0 && rows.length === 0) {
      const initialRows = value.map((tier, index) => ({
        id: index,
        price: tier.price.toString(),
        minQty: tier.minQty.toString(),
      }));
      setRows(initialRows);
    }
  }, [value]);

  const handleInputChange = (id: number, field: keyof Tier, value: string) => {
    setRows(prevRows =>
      prevRows.map(row =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
    handleChange(id, field, Number(value));
  };

  const addRow = () => {
    const newId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
    setRows([...rows, { id: newId, price: '', minQty: '' }]);
    handleAdd();
  };

  const deleteRow = (id: number) => {
    // console.log("on delete id: ", id)
    setRows(prevRows => prevRows.filter(row => row.id !== id));
    handleRemove(id);
  };

  return (
    <div className="space-y-4 border p-1">
        <table className="w-full border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border-b">Price</th>
            <th className="p-2 border-b">Quantity &ge;</th>
          </tr>
        </thead>
        <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b">
                <td className="p-2">
                  <Input
                    type="number"
                    value={row.price}
                    onChange={(e) => handleInputChange(row.id, 'price', e.target.value)}
                    placeholder="Price"
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    value={row.minQty}
                    onChange={(e) => handleInputChange(row.id, 'minQty', e.target.value)}
                    placeholder="minQty"
                  />
                </td>
                <td className="p-2">
                  <Button variant="destructive" onClick={() => deleteRow(row.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
      <Button type="button" disabled={disabled} onClick={addRow}>Add new price</Button>
    </div>
  )
}

export default TieredPricesInput
