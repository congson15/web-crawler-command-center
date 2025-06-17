
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Target, MousePointer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SelectedField {
  name: string;
  selector: string;
  type: string;
  preview?: string;
}

interface ElementSelectorProps {
  url: string;
  selectedFields: SelectedField[];
  setSelectedFields: (fields: SelectedField[]) => void;
}

export function ElementSelector({ url, selectedFields, setSelectedFields }: ElementSelectorProps) {
  const { toast } = useToast();
  const [isSelecting, setIsSelecting] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<{ x: number; y: number; text: string } | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const removeField = (index: number) => {
    setSelectedFields(selectedFields.filter((_, i) => i !== index));
  };

  const generateOptimizedSelector = (element: Element): string => {
    // Enhanced selector generation algorithm
    if (element.id) {
      return `#${element.id}`;
    }

    // Check for unique attributes
    const uniqueAttrs = ['data-testid', 'data-cy', 'name'];
    for (const attr of uniqueAttrs) {
      const value = element.getAttribute(attr);
      if (value) {
        return `[${attr}="${value}"]`;
      }
    }

    // Build CSS selector with classes
    let selector = element.tagName.toLowerCase();
    
    if (element.className && typeof element.className === 'string') {
      const classes = element.className.split(' ')
        .filter(c => c.trim() && !c.includes(' '))
        .slice(0, 3); // Limit to first 3 classes
      if (classes.length > 0) {
        selector += '.' + classes.join('.');
      }
    }

    // Add nth-child if needed for uniqueness
    const parent = element.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(child => 
        child.tagName === element.tagName
      );
      if (siblings.length > 1) {
        const index = siblings.indexOf(element) + 1;
        selector += `:nth-child(${index})`;
      }
    }

    return selector;
  };

  // Enhanced iframe interaction with better CORS handling
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !url) return;

    const handleIframeLoad = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) {
          console.warn('Cannot access iframe content due to CORS restrictions');
          return;
        }

        // Enhanced script injection with visual feedback
        const script = iframeDoc.createElement('script');
        script.textContent = `
          let highlightOverlay = null;
          let isSelectingMode = false;

          // Create highlight overlay
          function createHighlight(element) {
            removeHighlight();
            const rect = element.getBoundingClientRect();
            highlightOverlay = document.createElement('div');
            highlightOverlay.style.cssText = \`
              position: fixed;
              top: \${rect.top}px;
              left: \${rect.left}px;
              width: \${rect.width}px;
              height: \${rect.height}px;
              background: rgba(59, 130, 246, 0.2);
              border: 2px solid #3b82f6;
              pointer-events: none;
              z-index: 10000;
              border-radius: 4px;
              box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
            \`;
            document.body.appendChild(highlightOverlay);
          }

          function removeHighlight() {
            if (highlightOverlay) {
              highlightOverlay.remove();
              highlightOverlay = null;
            }
          }

          // Enhanced event handlers
          document.addEventListener('mouseover', function(e) {
            if (!isSelectingMode) return;
            e.preventDefault();
            createHighlight(e.target);
            
            const rect = e.target.getBoundingClientRect();
            window.parent.postMessage({
              type: 'elementHovered',
              x: rect.left + rect.width / 2,
              y: rect.top,
              text: e.target.textContent?.trim().slice(0, 50) || e.target.tagName
            }, '*');
          });

          document.addEventListener('mouseout', function(e) {
            if (!isSelectingMode) return;
            removeHighlight();
            window.parent.postMessage({ type: 'elementUnhovered' }, '*');
          });

          document.addEventListener('click', function(e) {
            if (!isSelectingMode) return;
            e.preventDefault();
            e.stopPropagation();
            
            const element = e.target;
            const textContent = element.textContent || element.innerText || '';
            
            window.parent.postMessage({
              type: 'elementSelected',
              selector: generateSelector(element),
              text: textContent.trim(),
              tagName: element.tagName.toLowerCase(),
              preview: textContent.trim().slice(0, 100)
            }, '*');
          });

          function generateSelector(element) {
            if (element.id) return '#' + element.id;
            
            let selector = element.tagName.toLowerCase();
            if (element.className && typeof element.className === 'string') {
              const classes = element.className.split(' ').filter(c => c.trim()).slice(0, 2);
              if (classes.length > 0) {
                selector += '.' + classes.join('.');
              }
            }
            return selector;
          }

          // Listen for selection mode toggle
          window.addEventListener('message', function(e) {
            if (e.data.type === 'toggleSelectionMode') {
              isSelectingMode = e.data.enabled;
              if (!isSelectingMode) {
                removeHighlight();
              }
            }
          });
        `;
        iframeDoc.head.appendChild(script);
      } catch (error) {
        console.warn('Cannot inject script due to CORS:', error);
        toast({
          title: "CORS Limitation",
          description: "Some sites may block element selection due to security restrictions. Try using a proxy URL.",
          variant: "destructive",
        });
      }
    };

    iframe.addEventListener('load', handleIframeLoad);
    return () => iframe.removeEventListener('load', handleIframeLoad);
  }, [url, toast]);

  // Listen for messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'elementSelected') {
        const { selector, text, preview } = event.data;
        
        const fieldName = text.slice(0, 30) || `field_${selectedFields.length + 1}`;
        
        const newField: SelectedField = {
          name: fieldName,
          selector: selector,
          type: 'html',
          preview: preview
        };

        setSelectedFields([...selectedFields, newField]);
        setIsSelecting(false);
        
        // Notify iframe to exit selection mode
        const iframe = iframeRef.current;
        if (iframe?.contentWindow) {
          iframe.contentWindow.postMessage({ type: 'toggleSelectionMode', enabled: false }, '*');
        }
        
        toast({
          title: "Field Added",
          description: `Added field: ${fieldName}`,
        });
      } else if (event.data.type === 'elementHovered') {
        setHoveredElement({ x: event.data.x, y: event.data.y, text: event.data.text });
      } else if (event.data.type === 'elementUnhovered') {
        setHoveredElement(null);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [selectedFields, setSelectedFields, toast]);

  const toggleSelectionMode = () => {
    const newMode = !isSelecting;
    setIsSelecting(newMode);
    
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'toggleSelectionMode', enabled: newMode }, '*');
    }
  };

  return (
    <div className="space-y-6">
      {/* Preview with enhanced controls */}
      <Card className="overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-800">Website Preview</CardTitle>
            <Button
              onClick={toggleSelectionMode}
              variant={isSelecting ? "destructive" : "default"}
              className={`transition-all duration-300 ${
                isSelecting 
                  ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200" 
                  : "bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-200"
              }`}
            >
              {isSelecting ? (
                <>
                  <Target className="h-4 w-4 mr-2" />
                  Stop Selecting
                </>
              ) : (
                <>
                  <MousePointer className="h-4 w-4 mr-2" />
                  Start Selecting
                </>
              )}
            </Button>
          </div>
          {isSelecting && (
            <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
              <strong>Selection Mode Active:</strong> Click on any element in the preview to add it as a field
            </div>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            <iframe
              ref={iframeRef}
              src={url}
              className="w-full h-[500px] border-0 rounded-b-lg"
              title="Website Preview"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
            {/* Hover tooltip */}
            {hoveredElement && (
              <div
                className="absolute bg-black text-white px-2 py-1 rounded text-xs z-50 pointer-events-none"
                style={{
                  left: hoveredElement.x,
                  top: hoveredElement.y - 30,
                  transform: 'translateX(-50%)'
                }}
              >
                {hoveredElement.text}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selected Fields with enhanced UI */}
      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-emerald-800 flex items-center gap-2">
            Selected Fields ({selectedFields.length})
            <Badge variant="secondary" className="bg-emerald-200 text-emerald-800">
              {selectedFields.length} fields
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {selectedFields.length === 0 ? (
            <div className="text-center py-8 text-emerald-600">
              <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">No fields selected yet</p>
              <p className="text-sm">Click "Start Selecting" and then click elements in the preview</p>
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
