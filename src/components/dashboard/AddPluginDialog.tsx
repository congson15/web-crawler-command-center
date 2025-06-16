
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Globe, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SelectedField {
  name: string;
  selector: string;
  type: string;
}

export function AddPluginDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [pluginName, setPluginName] = useState("");
  const [url, setUrl] = useState("");
  const [urlType, setUrlType] = useState<"html" | "json">("html");
  const [selectedFields, setSelectedFields] = useState<SelectedField[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlSubmit = () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleElementClick = (event: MessageEvent) => {
    if (event.data.type === 'elementClick') {
      const { tagName, className, id, textContent, selector } = event.data;
      
      const fieldName = textContent?.slice(0, 20) || `${tagName}_${selectedFields.length + 1}`;
      const newField: SelectedField = {
        name: fieldName,
        selector: selector,
        type: tagName.toLowerCase() === 'img' ? 'image' : 'text'
      };

      setSelectedFields(prev => [...prev, newField]);
      
      toast({
        title: "Field Added",
        description: `Added field: ${fieldName}`,
      });
    }
  };

  const removeField = (index: number) => {
    setSelectedFields(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!pluginName || !url || selectedFields.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and select at least one element",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `Plugin "${pluginName}" created successfully!`,
    });
    
    // Reset form
    setPluginName("");
    setUrl("");
    setSelectedFields([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Plugin
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Crawler Plugin</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="pluginName">Plugin Name</Label>
                <Input
                  id="pluginName"
                  value={pluginName}
                  onChange={(e) => setPluginName(e.target.value)}
                  placeholder="e.g., Product Price Monitor"
                />
              </div>
              
              <div>
                <Label htmlFor="urlType">URL Type</Label>
                <Select value={urlType} onValueChange={(value: "html" | "json") => setUrlType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="html">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        HTML Page
                      </div>
                    </SelectItem>
                    <SelectItem value="json">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        JSON API
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="url">Target URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    type="url"
                  />
                  <Button onClick={handleUrlSubmit} disabled={isLoading}>
                    {isLoading ? "Loading..." : "Load"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Selected Fields */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Selected Fields ({selectedFields.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {selectedFields.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    {urlType === 'html' 
                      ? "Click elements in the preview to add fields" 
                      : "Configure JSON path selectors"}
                  </p>
                ) : (
                  selectedFields.map((field, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium">{field.name}</div>
                        <div className="text-xs text-gray-500">{field.selector}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{field.type}</Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeField(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1">
                Create Plugin
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-4">
            <div>
              <Label>Preview</Label>
              {url && !isLoading ? (
                urlType === 'html' ? (
                  <div className="border rounded-lg overflow-hidden h-96">
                    <iframe
                      src={url}
                      className="w-full h-full"
                      title="Website Preview"
                      onLoad={() => {
                        // Add click event listener to iframe
                        window.addEventListener('message', handleElementClick);
                      }}
                    />
                  </div>
                ) : (
                  <Card className="h-96">
                    <CardContent className="p-4">
                      <p className="text-gray-500">JSON API configuration will be available here</p>
                      <div className="mt-4 p-4 bg-gray-100 rounded">
                        <code className="text-sm">
                          GET {url}
                        </code>
                      </div>
                    </CardContent>
                  </Card>
                )
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Globe className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Enter a URL and click Load to see preview</p>
                  </div>
                </div>
              )}
            </div>

            {urlType === 'html' && url && (
              <div className="text-sm text-gray-600 p-3 bg-blue-50 rounded">
                <strong>How to select fields:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Click on any element in the preview</li>
                  <li>• The selector will be auto-detected</li>
                  <li>• Fields will appear in the left panel</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
