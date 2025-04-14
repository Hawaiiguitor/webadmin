// components/ui/variant-input.tsx

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

interface Variant {
  sku: string;
  color?: string;
  size?: string;
  stock: number;
}

interface VariantInputProps {
  value: Variant[];
  onChange: (value: Variant[]) => void;
  disabled?: boolean;
}

const VariantInput: React.FC<VariantInputProps> = ({ value, onChange, disabled }) => {
  const handleAdd = () => {
    onChange([...value, { sku: '', color: '', size: '', stock: 0 }]);
  };

  const handleRemove = (index: number) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  const handleChange = (index: number, field: keyof Variant, fieldValue: string | number) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: fieldValue };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {value.map((variant, index) => (
        <div key={index} className="grid grid-cols-5 gap-4 items-center">
          <Input
            placeholder="SKU"
            value={variant.sku}
            onChange={(e) => handleChange(index, 'sku', e.target.value)}
            disabled={disabled}
          />
          <Input
            placeholder="Color"
            value={variant.color || ''}
            onChange={(e) => handleChange(index, 'color', e.target.value)}
            disabled={disabled}
          />
          <Input
            placeholder="Size"
            value={variant.size || ''}
            onChange={(e) => handleChange(index, 'size', e.target.value)}
            disabled={disabled}
          />
          <Input
            type="number"
            placeholder="Stock"
            value={variant.stock}
            onChange={(e) => handleChange(index, 'stock', parseInt(e.target.value) || 0)}
            disabled={disabled}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => handleRemove(index)}
            disabled={disabled}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button type="button" onClick={handleAdd} disabled={disabled}>
        Add Variant
      </Button>
    </div>
  );
};

export default VariantInput;
