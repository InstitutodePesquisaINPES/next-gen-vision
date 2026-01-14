import { motion } from "framer-motion";

const technologies = [
  { name: "Python", category: "Data Science" },
  { name: "React", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "TensorFlow", category: "ML" },
  { name: "AWS", category: "Cloud" },
  { name: "Power BI", category: "Analytics" },
  { name: "Docker", category: "DevOps" },
];

export function TechnologiesSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="text-lg font-medium text-muted-foreground">
            Tecnologias que dominamos
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 glass-card text-sm"
            >
              <span className="text-foreground font-medium">{tech.name}</span>
              <span className="text-muted-foreground ml-2 text-xs">• {tech.category}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
