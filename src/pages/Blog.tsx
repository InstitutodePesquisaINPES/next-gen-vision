import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";

const categories = ["Todos"];

const posts: Array<{
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}> = [];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "Todos" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
              Blog & Insights
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Conhecimento que{" "}
              <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 bg-clip-text text-transparent">
                transforma
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Artigos, tutoriais e insights sobre tecnologia, dados e inovação.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-30 backdrop-blur-xl bg-background/80">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {filteredPosts.length > 0 ? (
            <>
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-8">Em destaque</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {featuredPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group glass-card overflow-hidden hover-lift"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">{post.category}</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{post.date}</span>
                            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readTime}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                          <p className="text-muted-foreground">{post.excerpt}</p>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Posts */}
              {regularPosts.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-8">Todos os artigos</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="group glass-card overflow-hidden hover-lift"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                        </div>
                        <div className="p-5">
                          <span className="text-xs font-medium text-primary">{post.category}</span>
                          <h3 className="text-lg font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{post.date}</span><span>•</span><span>{post.readTime}</span>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Blog em breve
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Estamos preparando conteúdos sobre tecnologia, dados e inovação. 
                Volte em breve para acompanhar nossos artigos e insights.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
