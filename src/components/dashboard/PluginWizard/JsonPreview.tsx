
import { useState } from "react";
import { ChevronDown, ChevronRight, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface JsonPreviewProps {
  data: any;
  maxDepth?: number;
  currentDepth?: number;
}

export function JsonPreview({ data, maxDepth = 2, currentDepth = 0 }: JsonPreviewProps) {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(currentDepth < 2);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied to clipboard",
      description: "JSON value has been copied",
    });
  };

  const formatValue = (value: any): JSX.Element => {
    if (value === null) {
      return <span className="text-gray-500 italic">null</span>;
    }

    if (typeof value === 'string') {
      return (
        <span className="text-green-600">
          "{value.length > 50 ? `${value.substring(0, 50)}...` : value}"
        </span>
      );
    }

    if (typeof value === 'number') {
      return <span className="text-blue-600">{value}</span>;
    }

    if (typeof value === 'boolean') {
      return <span className="text-purple-600">{value.toString()}</span>;
    }

    if (Array.isArray(value)) {
      if (!expanded) {
        return (
          <div className="inline-flex items-center gap-2">
            <button
              onClick={() => setExpanded(true)}
              className="flex items-center gap-1 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <ChevronRight className="h-3 w-3" />
              <span>[{value.length} items]</span>
            </button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(JSON.stringify(value, null, 2))}
              className="h-5 w-5 p-0"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        );
      }

      return (
        <div className="ml-4">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => setExpanded(false)}
              className="flex items-center gap-1 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <ChevronDown className="h-3 w-3" />
              <span>[{value.length} items]</span>
            </button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(JSON.stringify(value, null, 2))}
              className="h-5 w-5 p-0"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-1">
            {value.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-gray-400 text-sm font-mono">[{index}]:</span>
                <div className="flex-1">
                  {currentDepth < maxDepth ? (
                    <JsonPreview data={item} maxDepth={maxDepth} currentDepth={currentDepth + 1} />
                  ) : (
                    <span className="text-gray-500 italic">
                      {typeof item === 'object' ? '{...}' : JSON.stringify(item)}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {value.length > 5 && (
              <div className="text-gray-400 text-sm italic">
                ... and {value.length - 5} more items
              </div>
            )}
          </div>
        </div>
      );
    }

    if (typeof value === 'object') {
      const keys = Object.keys(value);
      
      if (!expanded) {
        return (
          <div className="inline-flex items-center gap-2">
            <button
              onClick={() => setExpanded(true)}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <ChevronRight className="h-3 w-3" />
              <span>{{{keys.length} keys}}</span>
            </button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(JSON.stringify(value, null, 2))}
              className="h-5 w-5 p-0"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        );
      }

      return (
        <div className="ml-4">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => setExpanded(false)}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <ChevronDown className="h-3 w-3" />
              <span>{{{keys.length} keys}}</span>
            </button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(JSON.stringify(value, null, 2))}
              className="h-5 w-5 p-0"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-1">
            {keys.slice(0, 5).map((key) => (
              <div key={key} className="flex items-start gap-2">
                <span className="text-gray-600 text-sm font-mono">"{key}":</span>
                <div className="flex-1">
                  {currentDepth < maxDepth ? (
                    <JsonPreview data={value[key]} maxDepth={maxDepth} currentDepth={currentDepth + 1} />
                  ) : (
                    <span className="text-gray-500 italic">
                      {typeof value[key] === 'object' ? '{...}' : JSON.stringify(value[key])}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {keys.length > 5 && (
              <div className="text-gray-400 text-sm italic">
                ... and {keys.length - 5} more keys
              </div>
            )}
          </div>
        </div>
      );
    }

    return <span>{JSON.stringify(value)}</span>;
  };

  return <div className="font-mono text-sm">{formatValue(data)}</div>;
}
