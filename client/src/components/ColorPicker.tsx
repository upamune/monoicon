import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Shuffle } from "lucide-react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  onRandomize: () => void;
}

export default function ColorPicker({ color, onChange, onRandomize }: ColorPickerProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Color</Label>
        <div className="flex flex-wrap gap-2">
          <div className="flex-1 min-w-[200px]">
            <Input
              type="text"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#000000"
              className="font-mono w-full"
            />
          </div>
          <div className="flex gap-2">
            <Input
              type="color"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="w-16 h-10 p-1 cursor-pointer"
              title="Pick a color"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={onRandomize}
              title="Generate random color"
            >
              <Shuffle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
