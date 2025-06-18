
import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    // Cho phép select tất cả types, bao gồm arrays và objects
    const canSelect = value !== null;

    return (
      <div key={path} className="relative">
        <div 
          className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 ${
            isSelected ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 shadow-md' : ''
          }`}
          style={{ marginLeft: `${level * 24}px` }}
        >
          {/* Expand/Collapse Icon */}
          {isExpandable ? (
            <button
              onClick={() => toggleNode(path)}
              className="p-1 hover:bg-blue-100 rounded transition-colors"
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

          {/* Key */}
          <span className="font-medium text-slate-700 min-w-0 flex-shrink-0">
            {key}:
          </span>

          {/* Type Badge */}
          <Badge className={`text-xs px-2 py-0.5 ${getTypeColor(nodeType)}`}>
            {nodeType}
          </Badge>

          {/* Value Preview */}
          {!isExpandable && (
            <span className="text-slate-600 truncate flex-1 max-w-xs">
              {nodeType === 'string' ? `"${value}"` : String(value)}
            </span>
          )}

          {/* Array/Object Length */}
          {isExpandable && (
            <span className="text-slate-500 text-sm">
              {nodeType === 'array' ? `[${value.length}]` : `{${Object.keys(value).length}}`}
            </span>
          )}

          {/* Select Button - Now available for all types */}
          {canSelect && (
            <Button
              size="sm"
              variant={isSelected ? "default" : "outline"}
              onClick={() => onFieldSelect(path, generateFieldName(key, path), value)}
              className={`ml-auto h-7 px-3 transition-all duration-200 ${
                isSelected 
                  ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-200' 
                  : 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
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

        {/* Children */}
        {isExpandable && isExpanded && (
          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 to-transparent"></div>
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
      <div className="text-center py-12 text-slate-500">
        <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
          <Eye className="h-8 w-8 text-slate-400" />
        </div>
        <p className="text-lg font-medium">No JSON data available</p>
        <p className="text-sm">Fetch data to explore the JSON structure</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 max-h-96 overflow-auto custom-scrollbar">
      <div className="mb-4 p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border">
        <h4 className="font-semibold text-slate-800 mb-1">Interactive JSON Explorer</h4>
        <p className="text-sm text-slate-600">Click on any field (including arrays/objects) to add it</p>
      </div>
      {renderNode(data, 'root', 'root')}
    </div>
  );
}
