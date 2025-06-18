
import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonPreview } from "./JsonPreview";

interface JsonNode {
  key: string;
  value: any;
  path: string;
  type: string;
  isExpanded?: boolean;
}

interface JsonTreeViewerProps {
  data: any;
  onFieldSelect: (path: string, key: string, value: any) => void;
  selectedPaths: string[];
}

export function JsonTreeViewer({ data, onFieldSelect, selectedPaths }: JsonTreeViewerProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));

  const toggleNode = (path: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedNodes(newExpanded);
  };

  const getNodeType = (value: any): string => {
    if (Array.isArray(value)) return 'array';
    if (value === null) return 'null';
    if (typeof value === 'object') return 'object';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    return 'unknown';
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'string': return 'text-green-600 bg-green-50 border-green-200';
      case 'number': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'boolean': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'array': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'object': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      case 'null': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const generateFieldName = (key: string, path: string): string => {
    const cleanKey = key.replace(/[_-]/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2');
    const words = cleanKey.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(' ');
  };

  const renderNode = (value: any, key: string, path: string, level: number = 0): JSX.Element => {
    const nodeType = getNodeType(value);
    const isExpandable = nodeType === 'object' || nodeType === 'array';
    const isExpanded = expandedNodes.has(path);
    const isSelected = selectedPaths.includes(path);
    const canSelect = value !== null;

    return (
      <div key={path} className="relative animate-fade-in">
        <div 
          className={`flex items-start gap-3 py-3 px-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md ${
            isSelected ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 shadow-lg' : ''
          }`}
          style={{ marginLeft: `${level * 24}px` }}
        >
          {/* Expand/Collapse Icon */}
          {isExpandable ? (
            <button
              onClick={() => toggleNode(path)}
              className="p-1 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-110"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-blue-600" />
              ) : (
                <ChevronRight className="h-4 w-4 text-blue-600" />
              )}
            </button>
          ) : (
            <div className="w-6 h-6"></div>
          )}

          <div className="flex-1 min-w-0 space-y-2">
            {/* Header with key and type */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-semibold text-slate-700 text-lg">
                {key}:
              </span>
              <Badge className={`text-xs px-3 py-1 ${getTypeColor(nodeType)}`}>
                {nodeType}
              </Badge>
              
              {/* Select Button */}
              {canSelect && (
                <Button
                  size="sm"
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => onFieldSelect(path, generateFieldName(key, path), value)}
                  className={`ml-auto h-8 px-4 transition-all duration-300 hover:scale-105 ${
                    isSelected 
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-200' 
                      : 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 hover:shadow-md'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Eye className="h-3 w-3 mr-1" />
                      Selected
                    </>
                  ) : (
                    <>
                      <Plus className="h-3 w-3 mr-1" />
                      Add Field
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Enhanced Preview */}
            <div className="bg-slate-50 rounded-lg p-3 border">
              <JsonPreview data={value} maxDepth={2} />
            </div>
          </div>
        </div>

        {/* Children */}
        {isExpandable && isExpanded && (
          <div className="relative mt-2">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 to-transparent"></div>
            {nodeType === 'array'
              ? value.map((item: any, index: number) => 
                  renderNode(item, `[${index}]`, `${path}[${index}]`, level + 1)
                )
              : Object.entries(value).map(([k, v]) => 
                  renderNode(v, k, path === 'root' ? k : `${path}.${k}`, level + 1)
                )
            }
          </div>
        )}
      </div>
    );
  };

  if (!data) {
    return (
      <div className="text-center py-16 text-slate-500">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center shadow-inner">
          <Eye className="h-10 w-10 text-slate-400" />
        </div>
        <p className="text-xl font-medium mb-2">No JSON data available</p>
        <p className="text-sm">Fetch data to explore the JSON structure</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 max-h-[600px] overflow-auto custom-scrollbar shadow-xl">
      <div className="mb-6 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border shadow-inner">
        <h4 className="font-bold text-slate-800 mb-2 text-lg">Interactive JSON Explorer</h4>
        <p className="text-sm text-slate-600">Click on any field (including arrays/objects) to add it. Expand to see detailed previews.</p>
      </div>
      <div className="space-y-1">
        {renderNode(data, 'root', 'root')}
      </div>
    </div>
  );
}
