import { AspectRatio } from "./ui/aspect-ratio";

interface IconPreviewProps {
  color: string;
}

export default function IconPreview({ color }: IconPreviewProps) {
  return (
    <div className="w-full">
      <AspectRatio ratio={1}>
        <div
          data-icon-preview
          className="w-full h-full rounded-lg shadow-md transition-colors preview-shadow"
          style={{ backgroundColor: color }}
        />
      </AspectRatio>
    </div>
  );
}
