
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, TrendingDown, ExternalLink, Star, MapPin } from "lucide-react";

interface PriceResult {
  id: string;
  store: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  shipping?: number;
  location: string;
  availability: "in-stock" | "limited" | "out-of-stock";
  url: string;
}

interface PriceComparisonProps {
  currentTheme: {
    name: string;
    id: string;
    primary: string;
    secondary: string;
    background: string;
    pageGradient: string;
    accent: string;
  };
}

export function PriceComparison({ currentTheme }: PriceComparisonProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<PriceResult[]>([]);

  // Mock data for demonstration
  const mockResults: PriceResult[] = [
    {
      id: "1",
      store: "Shopee",
      price: 299000,
      originalPrice: 399000,
      discount: 25,
      rating: 4.8,
      reviews: 1250,
      shipping: 0,
      location: "TP.HCM",
      availability: "in-stock",
      url: "#"
    },
    {
      id: "2", 
      store: "Lazada",
      price: 315000,
      originalPrice: 399000,
      discount: 21,
      rating: 4.6,
      reviews: 890,
      shipping: 15000,
      location: "Hà Nội",
      availability: "in-stock",
      url: "#"
    },
    {
      id: "3",
      store: "Tiki",
      price: 289000,
      rating: 4.9,
      reviews: 456,
      shipping: 0,
      location: "TP.HCM",
      availability: "limited",
      url: "#"
    },
    {
      id: "4",
      store: "Sendo",
      price: 335000,
      originalPrice: 399000,
      discount: 16,
      rating: 4.4,
      reviews: 234,
      shipping: 20000,
      location: "Đà Nẵng",
      availability: "in-stock",
      url: "#"
    },
    {
      id: "5",
      store: "Thế Giới Di Động",
      price: 359000,
      rating: 4.7,
      reviews: 2100,
      shipping: 0,
      location: "Toàn quốc",
      availability: "in-stock",
      url: "#"
    }
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults);
      setIsLoading(false);
    }, 1500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "in-stock": return "bg-green-500";
      case "limited": return "bg-orange-500";
      case "out-of-stock": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case "in-stock": return "Còn hàng";
      case "limited": return "Sắp hết";
      case "out-of-stock": return "Hết hàng";
      default: return "Không rõ";
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const lowestPrice = results.length > 0 ? Math.min(...results.map(r => r.price + (r.shipping || 0))) : 0;
  const highestPrice = results.length > 0 ? Math.max(...results.map(r => r.price + (r.shipping || 0))) : 0;

  return (
    <div className={`bg-gradient-to-br ${currentTheme.pageGradient} min-h-screen`}>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-4 mb-6">
            <div 
              className="w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`
              }}
            >
              <Search className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 
                className="text-4xl font-bold"
                style={{ color: currentTheme.primary }}
              >
                So Sánh Giá
              </h1>
              <p className="text-lg text-slate-600 mt-2">Tìm giá tốt nhất cho sản phẩm bạn muốn</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <Card 
            className="border-white/50 shadow-xl"
            style={{ 
              background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent}cc)`,
              borderColor: `${currentTheme.primary}30`
            }}
          >
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Nhập tên sản phẩm cần tìm (ví dụ: iPhone 15, Samsung Galaxy S24...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="h-12 text-lg bg-white/50 backdrop-blur-sm"
                    style={{ borderColor: `${currentTheme.primary}30` }}
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  disabled={isLoading || !searchTerm.trim()}
                  className="h-12 px-8 shadow-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                    color: 'white'
                  }}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Search className="h-5 w-5 mr-2" />
                  )}
                  {isLoading ? "Đang tìm..." : "Tìm Kiếm"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Price Summary */}
        {results.length > 0 && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={cardVariants}>
              <Card 
                className="border-white/50 shadow-xl"
                style={{ 
                  background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent}cc)`,
                  borderColor: `${currentTheme.primary}30`
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Giá Thấp Nhất</p>
                      <p 
                        className="text-2xl font-bold"
                        style={{ color: '#10b981' }}
                      >
                        {formatPrice(lowestPrice)}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl shadow-lg bg-green-500">
                      <TrendingDown className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card 
                className="border-white/50 shadow-xl"
                style={{ 
                  background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent}cc)`,
                  borderColor: `${currentTheme.primary}30`
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Giá Cao Nhất</p>
                      <p 
                        className="text-2xl font-bold"
                        style={{ color: '#ef4444' }}
                      >
                        {formatPrice(highestPrice)}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl shadow-lg bg-red-500">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card 
                className="border-white/50 shadow-xl"
                style={{ 
                  background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent}cc)`,
                  borderColor: `${currentTheme.primary}30`
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Chênh Lệch</p>
                      <p 
                        className="text-2xl font-bold"
                        style={{ color: currentTheme.primary }}
                      >
                        {formatPrice(highestPrice - lowestPrice)}
                      </p>
                    </div>
                    <div 
                      className="p-3 rounded-xl shadow-lg"
                      style={{ backgroundColor: currentTheme.primary }}
                    >
                      <Search className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <motion.div 
            className="space-y-4"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ color: currentTheme.primary }}
            >
              Kết Quả Tìm Kiếm ({results.length} cửa hàng)
            </h2>
            
            {results
              .sort((a, b) => (a.price + (a.shipping || 0)) - (b.price + (b.shipping || 0)))
              .map((result, index) => (
              <motion.div key={result.id} variants={cardVariants}>
                <Card 
                  className="border-white/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent}cc)`,
                    borderColor: `${currentTheme.primary}30`
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold" style={{ color: currentTheme.primary }}>
                            {result.store}
                          </h3>
                          {index === 0 && (
                            <Badge className="bg-green-500 text-white">Giá tốt nhất</Badge>
                          )}
                          <Badge className={`${getAvailabilityColor(result.availability)} text-white`}>
                            {getAvailabilityText(result.availability)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{result.rating}</span>
                            <span className="text-slate-600">({result.reviews} đánh giá)</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-600">
                            <MapPin className="h-4 w-4" />
                            <span>{result.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold" style={{ color: currentTheme.primary }}>
                            {formatPrice(result.price)}
                          </span>
                          {result.originalPrice && (
                            <span className="text-lg text-slate-500 line-through">
                              {formatPrice(result.originalPrice)}
                            </span>
                          )}
                          {result.discount && (
                            <Badge className="bg-red-500 text-white">
                              -{result.discount}%
                            </Badge>
                          )}
                        </div>
                        
                        {result.shipping && result.shipping > 0 && (
                          <p className="text-sm text-slate-600 mt-1">
                            + {formatPrice(result.shipping)} phí vận chuyển
                          </p>
                        )}
                        
                        <p className="text-lg font-semibold mt-2" style={{ color: currentTheme.secondary }}>
                          Tổng: {formatPrice(result.price + (result.shipping || 0))}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button 
                          className="shadow-lg transition-all duration-300 hover:scale-105"
                          style={{
                            background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                            color: 'white'
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Xem Sản Phẩm
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && results.length === 0 && searchTerm && (
          <motion.div variants={cardVariants} initial="hidden" animate="visible">
            <Card 
              className="border-white/50 shadow-xl"
              style={{ 
                background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent}cc)`,
                borderColor: `${currentTheme.primary}30`
              }}
            >
              <CardContent className="p-12 text-center">
                <Search className="h-16 w-16 mx-auto mb-4 text-slate-400" />
                <h3 className="text-xl font-semibold mb-2" style={{ color: currentTheme.primary }}>
                  Không tìm thấy kết quả
                </h3>
                <p className="text-slate-600">
                  Thử tìm kiếm với từ khóa khác hoặc kiểm tra lại tên sản phẩm
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
