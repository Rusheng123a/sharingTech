import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXPORT_FORMATS } from "@/lib/constants";
import { useState } from "react";

interface ExportDialogProps {
  onExport: (format: string) => void;
}

export function ExportDialog({ onExport }: ExportDialogProps) {
  const [format, setFormat] = useState(EXPORT_FORMATS[0].id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Export Image</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Image</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Format</label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EXPORT_FORMATS.map((format) => (
                  <SelectItem key={format.id} value={format.id}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => onExport(format)}>Download</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}