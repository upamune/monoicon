import { useState } from 'react';
import IconPreview from '../components/IconPreview';
import ColorPicker from '../components/ColorPicker';
import DownloadOptions from '../components/DownloadOptions';
import { Card } from '@/components/ui/card';
import { generateRandomColor } from '../lib/colorUtils';

export default function Home() {
  const [color, setColor] = useState(generateRandomColor());
  const [size, setSize] = useState(512);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Icon Generator</h1>
          <p className="text-muted-foreground">
            Create simple, beautiful icons in seconds
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className="p-6 space-y-6">
            <ColorPicker
              color={color}
              onChange={setColor}
              onRandomize={() => setColor(generateRandomColor())}
            />
            <DownloadOptions
              color={color}
              size={size}
              onSizeChange={setSize}
            />
          </Card>

          <Card className="p-6">
            <IconPreview color={color} />
          </Card>
        </div>
      </div>
    </div>
  );
}
