
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Globe, Code, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WizardProgress } from "./PluginWizard/WizardProgress";
import { ElementSelector } from "./PluginWizard/ElementSelector";
import { JsonFieldConfigurator } from "./PluginWizard/JsonFieldConfigurator";

interface SelectedField {
  name: string;
  selector: string;
  type: string;
  preview?: string;
}

export function EnhancedAddPluginDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [pluginName, setPluginName] = useState("");
  const [url, setUrl] = useState("");
  const [urlType, setUrlType] = useState<"html" | "json">("html");
  const [selectedFields, setSelectedFields] = useState<SelectedField[]>([]);

  const steps = ["Basic Info", "URL Configuration", "Field Selection", "Review & Create"];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
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
    setCurrentStep(0);
    setOpen(false);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0:
        return pluginName.length > 0;
      case 1:
        return url.length > 0;
      case 2:
        return selectedFields.length > 0;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Sparkles className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-2xl font-bold text-purple-800 mb-2">Create Your Plugin</h3>
                <p className="text-purple-600">Give your crawler plugin a memorable name</p>
              </div>
              <div>
                <Label htmlFor="pluginName" className="text-base font-medium text-purple-800">Plugin Name</Label>
                <Input
                  id="pluginName"
                  value={pluginName}
                  onChange={(e) => setPluginName(e.target.value)}
                  placeholder="e.g., Amazon Product Monitor"
                  className="mt-2 h-12 border-purple-200 focus:border-purple-400 text-lg"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-8 space-y-6">
              <div className="text-center mb-6">
                <Globe className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-2xl font-bold text-blue-800 mb-2">Configure Target</h3>
                <p className="text-blue-600">Choose the type of data source and target URL</p>
              </div>
              
              <div>
                <Label htmlFor="urlType" className="text-base font-medium text-blue-800">Data Source Type</Label>
                <Select value={urlType} onValueChange={(value: "html" | "json") => setUrlType(value)}>
                  <SelectTrigger className="mt-2 h-12 border-blue-200 focus:border-blue-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="html">
                      <div className="flex items-center gap-3 py-2">
                        <Globe className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">HTML Page</div>
                          <div className="text-sm text-gray-500">Scrape data from web pages</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="json">
                      <div className="flex items-center gap-3 py-2">
                        <Code className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">JSON API</div>
                          <div className="text-sm text-gray-500">Extract data from API endpoints</div>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="url" className="text-base font-medium text-blue-800">Target URL</Label>
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  type="url"
                  className="mt-2 h-12 border-blue-200 focus:border-blue-400 text-lg"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return urlType === 'html' ? (
          <ElementSelector
            url={url}
            selectedFields={selectedFields}
            setSelectedFields={setSelectedFields}
          />
        ) : (
          <JsonFieldConfigurator
            url={url}
            selectedFields={selectedFields}
            setSelectedFields={setSelectedFields}
          />
        );

      case 3:
        return (
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Sparkles className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">Review & Create</h3>
                <p className="text-green-600">Review your configuration before creating the plugin</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">Plugin Details</h4>
                  <p><strong>Name:</strong> {pluginName}</p>
                  <p><strong>Type:</strong> {urlType.toUpperCase()}</p>
                  <p><strong>URL:</strong> {url}</p>
                  <p><strong>Fields:</strong> {selectedFields.length} selected</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">Selected Fields</h4>
                  <div className="space-y-2">
                    {selectedFields.map((field, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <span className="font-medium">{field.name}</span>
                        <span className="text-sm text-gray-600">{field.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-200 transition-all duration-300 hover:scale-105">
          <Plus className="h-4 w-4 mr-2" />
          Add New Plugin
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create New Crawler Plugin
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <WizardProgress 
            currentStep={currentStep} 
            totalSteps={steps.length}
            steps={steps}
          />
          
          <div className="mt-8">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              
              {currentStep === steps.length - 1 ? (
                <Button 
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-200"
                >
                  Create Plugin
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  disabled={!canProceedToNext()}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
