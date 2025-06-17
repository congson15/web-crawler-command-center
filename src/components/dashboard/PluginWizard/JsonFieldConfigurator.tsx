
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Code, Plus, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SelectedField {
  name: string;
  selector: string;
  type: string;
  preview?: string;
}

interface JsonFieldConfiguratorProps {
  url: string;
  selectedFields: SelectedField[];
  setSelectedFields: (fields: SelectedField[]) => void;
}

export function JsonFieldConfigurator({ url, selectedFields, setSelectedFields }: JsonFieldConfiguratorProps) {
  const { toast } = useToast();
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldPath, setNewFieldPath] = useState("");
  const [jsonResponse, setJsonResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchJsonData = async () => {
    if (!url) return;
    
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
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

    // Try to extract preview from JSON response
    let preview = "";
    if (jsonResponse) {
      try {
        const data = JSON.parse(jsonResponse);
        const value = getNestedValue(data, newFieldPath);
        preview = value ? String(value).slice(0, 50) : "";
      } catch (error) {
        console.warn("Could not extract preview from JSON");
      }
    }

    const newField: SelectedField = {
      name: newFieldName,
      selector: newFieldPath,
      type: 'json',
      preview
    };

    setSelectedFields([...selectedFields, newField]);
    setNewFieldName("");
    setNewFieldPath("");
    
    toast({
      title: "Field Added",
      description: `Added JSON field: ${newFieldName}`,
    });
  };

  const removeField = (index: number) => {
    setSelectedFields(selectedFields.filter((_, i) => i !== index));
  };

  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => {
      if (key.includes('[') && key.includes(']')) {
        const arrayKey = key.substring(0, key.indexOf('['));
        const arrayIndex = parseInt(key.substring(key.indexOf('[') + 1, key.indexOf(']')));
        return current?.[arrayKey]?.[arrayIndex];
      }
      return current?.[key];
    }, obj);
  };

  return (
    <div className="space-y-6">
      {/* JSON API Response */}
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Code className="h-5 w-5" />
              JSON API Response
            </CardTitle>
            <Button 
              onClick={fetchJsonData} 
              disabled={isLoading || !url}
              className="bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-200"
            >
              {isLoading ? "Loading..." : "Fetch Data"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-slate-100 rounded-lg border">
              <code className="text-sm font-mono text-slate-600">
                GET {url || "Enter URL above"}
              </code>
            </div>
            {jsonResponse ? (
              <div className="relative">
                <Textarea
                  value={jsonResponse}
                  readOnly
                  className="min-h-[300px] font-mono text-xs bg-slate-900 text-green-400 border-slate-700"
                  placeholder="JSON response will appear here..."
                />
                <Badge className="absolute top-2 right-2 bg-green-600">
                  Valid JSON
                </Badge>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-300 rounded-lg h-[300px] flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <Code className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="font-medium">No JSON data loaded</p>
                  <p className="text-sm">Click "Fetch Data" to load the API response</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Field Configuration */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-blue-800">Add JSON Fields</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fieldName" className="text-sm font-medium text-blue-800">Field Name</Label>
              <Input
                id="fieldName"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                placeholder="e.g., product_title"
                className="mt-1 h-10 border-blue-200 focus:border-blue-400"
              />
            </div>
            <div>
              <Label htmlFor="fieldPath" className="text-sm font-medium text-blue-800">JSON Path</Label>
              <Input
                id="fieldPath"
                value={newFieldPath}
                onChange={(e) => setNewFieldPath(e.target.value)}
                placeholder="e.g., data.products[0].title"
                className="mt-1 h-10 border-blue-200 focus:border-blue-400"
              />
            </div>
          </div>
          <Button 
            onClick={addJsonField} 
            className="w-full bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-200"
            disabled={!newFieldName || !newFieldPath}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Field
          </Button>
        </CardContent>
      </Card>

      {/* Selected Fields */}
      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-emerald-800 flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Configured Fields ({selectedFields.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {selectedFields.length === 0 ? (
            <div className="text-center py-8 text-emerald-600">
              <Code className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">No fields configured yet</p>
              <p className="text-sm">Add JSON path selectors above</p>
            </div>
          ) : (
            selectedFields.map((field, index) => (
              <div key={index} className="group bg-white p-4 rounded-xl border border-emerald-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900">{field.name}</h4>
                      <Badge variant="outline" className="text-xs bg-emerald-100 text-emerald-700 border-emerald-300">
                        {field.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mb-1 font-mono bg-gray-50 p-2 rounded border">
                      {field.selector}
                    </p>
                    {field.preview && (
                      <p className="text-sm text-gray-600 italic">
                        Preview: "{field.preview}..."
                      </p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeField(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
