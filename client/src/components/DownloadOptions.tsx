import { useState } from 'react';
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
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
      // SVGを生成（正方形を保証、背景透明）
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="background: transparent;">
  <rect width="100%" height="100%" fill="${color}"/>
</svg>`;
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `icon-${color.replace('#', '')}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // Create a temporary div for clean export
      const tempDiv = document.createElement('div');
      tempDiv.style.width = `${size}px`;
      tempDiv.style.height = `${size}px`;
      tempDiv.style.backgroundColor = color;
      document.body.appendChild(tempDiv);
      
      const canvas = await html2canvas(tempDiv, {
        width: size,
        height: size,
        scale: 1,
        backgroundColor: color,
        logging: false,
      });
      
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `icon-${color.replace('#', '')}.png`;
      a.click();
      
      // Clean up
      document.body.removeChild(tempDiv);
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
