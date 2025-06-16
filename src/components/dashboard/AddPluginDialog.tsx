
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Globe, Code, Trash2 } from "lucide-react";
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
  const [jsonResponse, setJsonResponse] = useState("");
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldPath, setNewFieldPath] = useState("");

  const handleUrlSubmit = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    if (urlType === "json") {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setJsonResponse(JSON.stringify(data, null, 2));
        toast({
          title: "Success",
          description: "JSON data loaded successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch JSON data",
          variant: "destructive",
        });
        setJsonResponse("");
      }
    }
    
    setTimeout(() => setIsLoading(false), 1000);
  };

  const addJsonField = () => {
    if (!newFieldName || !newFieldPath) {
      toast({
        title: "Error",
        description: "Please enter both field name and JSON path",
        variant: "destructive",
      });
      return;
    }

    const newField: SelectedField = {
      name: newFieldName,
      selector: newFieldPath,
      type: 'json'
    };

    setSelectedFields(prev => [...prev, newField]);
    setNewFieldName("");
    setNewFieldPath("");
    
    toast({
      title: "Field Added",
      description: `Added JSON field: ${newFieldName}`,
    });
  };

  const removeField = (index: number) => {
    setSelectedFields(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!pluginName || !url || selectedFields.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and select at least one field",
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
    setJsonResponse("");
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
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Crawler Plugin</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="pluginName" className="text-base font-medium">Plugin Name</Label>
                <Input
                  id="pluginName"
                  value={pluginName}
                  onChange={(e) => setPluginName(e.target.value)}
                  placeholder="e.g., Product Price Monitor"
                  className="mt-2 h-12"
                />
              </div>
              
              <div>
                <Label htmlFor="urlType" className="text-base font-medium">URL Type</Label>
                <Select value={urlType} onValueChange={(value: "html" | "json") => setUrlType(value)}>
                  <SelectTrigger className="mt-2 h-12">
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
                <Label htmlFor="url" className="text-base font-medium">Target URL</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    type="url"
                    className="h-12"
                  />
                  <Button onClick={handleUrlSubmit} disabled={isLoading} className="h-12 px-6">
                    {isLoading ? "Loading..." : "Load"}
                  </Button>
                </div>
              </div>
            </div>

            {/* JSON Field Configuration */}
            {urlType === 'json' && url && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add JSON Fields</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="fieldName" className="text-sm font-medium">Field Name</Label>
                    <Input
                      id="fieldName"
                      value={newFieldName}
                      onChange={(e) => setNewFieldName(e.target.value)}
                      placeholder="e.g., product_title"
                      className="mt-1 h-10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fieldPath" className="text-sm font-medium">JSON Path</Label>
                    <Input
                      id="fieldPath"
                      value={newFieldPath}
                      onChange={(e) => setNewFieldPath(e.target.value)}
                      placeholder="e.g., data.products[0].title"
                      className="mt-1 h-10"
                    />
                  </div>
                  <Button onClick={addJsonField} className="w-full">
                    Add Field
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Selected Fields */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Selected Fields ({selectedFields.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedFields.length === 0 ? (
                  <p className="text-gray-500 text-sm py-4">
                    {urlType === 'html' 
                      ? "Click elements in the preview to add fields" 
                      : "Configure JSON path selectors above"}
                  </p>
                ) : (
                  selectedFields.map((field, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{field.name}</div>
                        <div className="text-xs text-gray-500 mt-1 break-all">{field.selector}</div>
                      </div>
                      <div className="flex items-center gap-2 ml-3">
                        <Badge variant="secondary" className="text-xs">{field.type}</Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeField(index)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} className="flex-1 h-12">
                Create Plugin
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)} className="h-12 px-6">
                Cancel
              </Button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Preview</Label>
              {url && !isLoading ? (
                urlType === 'html' ? (
                  <div className="border rounded-lg overflow-hidden h-[600px] mt-2">
                    <iframe
                      src={url}
                      className="w-full h-full"
                      title="Website Preview"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                ) : (
                  <Card className="h-[600px] mt-2">
                    <CardContent className="p-4 h-full">
                      <div className="h-full flex flex-col">
                        <div className="mb-4 p-3 bg-gray-100 rounded">
                          <code className="text-sm font-mono">
                            GET {url}
                          </code>
                        </div>
                        {jsonResponse && (
                          <div className="flex-1 overflow-auto">
                            <Label className="text-sm font-medium">Response:</Label>
                            <Textarea
                              value={jsonResponse}
                              readOnly
                              className="mt-2 h-full min-h-[400px] font-mono text-xs"
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-[600px] flex items-center justify-center mt-2">
                  <div className="text-center text-gray-500">
                    <Globe className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Enter a URL and click Load to see preview</p>
                  </div>
                </div>
              )}
            </div>

            {urlType === 'html' && url && (
              <div className="text-sm text-gray-600 p-4 bg-blue-50 rounded-lg">
                <strong>How to select fields:</strong>
                <ul className="mt-2 space-y-1">
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
