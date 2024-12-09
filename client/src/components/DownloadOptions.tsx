import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";
import html2canvas from 'html2canvas';

interface DownloadOptionsProps {
  color: string;
  size: number;
  onSizeChange: (size: number) => void;
}

export default function DownloadOptions({
  color,
  size,
  onSizeChange,
}: DownloadOptionsProps) {
  const [format, setFormat] = useState<'svg' | 'png'>('png');

  const handleDownload = async () => {
    if (format === 'svg') {
      const svg = `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${size}" height="${size}" fill="${color}"/>
        </svg>
      `;
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `icon-${color.replace('#', '')}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const iconElement = document.querySelector('[data-icon-preview]');
      if (!iconElement) return;
      
      const canvas = await html2canvas(iconElement as HTMLElement, {
        width: size,
        height: size,
      });
      
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `icon-${color.replace('#', '')}.png`;
      a.click();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Format</Label>
        <Select value={format} onValueChange={(v) => setFormat(v as 'svg' | 'png')}>
          <SelectTrigger>
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="svg">SVG</SelectItem>
            <SelectItem value="png">PNG</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {format === 'png' && (
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Size (pixels)</Label>
            <span className="text-sm text-muted-foreground">{size}px</span>
          </div>
          <Slider
            value={[size]}
            onValueChange={([value]) => onSizeChange(value)}
            min={16}
            max={5000}
            step={1}
            className="w-full"
          />
        </div>
      )}

      <Button onClick={handleDownload} className="w-full">
        <Download className="mr-2 h-4 w-4" />
        Download {format.toUpperCase()}
      </Button>
    </div>
  );
}
