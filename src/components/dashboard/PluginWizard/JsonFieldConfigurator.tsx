
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Eye, Sparkles, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { JsonTreeViewer } from "./JsonTreeViewer";

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
  const [jsonResponse, setJsonResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rawJsonText, setRawJsonText] = useState("");

  const fetchJsonData = async () => {
    if (!url) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setJsonResponse(data);
      setRawJsonText(JSON.stringify(data, null, 2));
      toast({
        title: "Success",
        description: "JSON data loaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch JSON data. CORS issues may prevent direct API calls.",
        variant: "destructive",
      });
      setJsonResponse(null);
      setRawJsonText("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldSelect = (path: string, fieldName: string, value: any) => {
    const existingIndex = selectedFields.findIndex(field => field.selector === path);
    
    if (existingIndex >= 0) {
      // Remove if already selected
      setSelectedFields(selectedFields.filter((_, i) => i !== existingIndex));
      toast({
        title: "Field Removed",
        description: `Removed field: ${fieldName}`,
      });
    } else {
      // Add new field
      const newField: SelectedField = {
        name: fieldName,
        selector: path,
        type: 'json',
        preview: String(value).slice(0, 50)
      };

      setSelectedFields([...selectedFields, newField]);
      toast({
        title: "Field Added",
        description: `Added field: ${fieldName}`,
      });
    }
  };

  const removeField = (index: number) => {
    setSelectedFields(selectedFields.filter((_, i) => i !== index));
  };

  const selectedPaths = selectedFields.map(field => field.selector);

  return (
    <div className="space-y-8">
      {/* API Configuration */}
      <Card className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-blue-200 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg shadow-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              JSON API Configuration
            </CardTitle>
            <Button 
              onClick={fetchJsonData} 
              disabled={isLoading || !url}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-xl shadow-blue-200 transition-all duration-300 hover:scale-105"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Loading...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Fetch Data
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100 shadow-inner">
            <code className="text-sm font-mono text-slate-700 break-all">
              GET {url || "Enter URL in previous step"}
            </code>
          </div>
        </CardContent>
      </Card>

      {/* Interactive JSON Explorer */}
      {jsonResponse && (
        <Card className="bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 border-emerald-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-emerald-500 rounded-lg shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              Interactive JSON Explorer
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
                Click to Add Fields
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <JsonTreeViewer
              data={jsonResponse}
              onFieldSelect={handleFieldSelect}
              selectedPaths={selectedPaths}
            />
          </CardContent>
        </Card>
      )}

      {/* Raw JSON View (fallback) */}
      {rawJsonText && (
        <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Code className="h-5 w-5" />
              Raw JSON Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="bg-slate-900 text-green-400 p-4 rounded-xl overflow-auto max-h-64 text-xs font-mono border border-slate-700 shadow-inner">
                {rawJsonText}
              </pre>
              <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                Valid JSON
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Fields */}
      <Card className="bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 border-violet-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-violet-500 rounded-lg shadow-lg">
              <Eye className="h-6 w-6 text-white" />
            </div>
            Selected Fields ({selectedFields.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedFields.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-violet-500" />
              </div>
              <p className="text-lg font-medium text-slate-700">No fields selected yet</p>
              <p className="text-slate-500">Use the interactive JSON explorer above to add fields</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {selectedFields.map((field, index) => (
                <div key={index} className="group relative">
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-violet-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="font-bold text-slate-800 text-lg">{field.name}</h4>
                          <Badge className="bg-violet-100 text-violet-700 border-violet-300 px-3 py-1">
                            {field.type}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Path:</span>
                            <code className="text-xs bg-slate-100 px-2 py-1 rounded border font-mono text-slate-700">
                              {field.selector}
                            </code>
                          </div>
                          {field.preview && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Preview:</span>
                              <span className="text-sm text-slate-600 italic bg-slate-50 px-2 py-1 rounded">
                                "{field.preview}..."
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeField(index)}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-200 ml-4 text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
