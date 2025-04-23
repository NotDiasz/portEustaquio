"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Code, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingCodeProps {
  className?: string
}

export function FloatingCode({ className }: FloatingCodeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [codeSnippets] = useState([
    {
      language: "javascript",
      title: "Função Recursiva",
      code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calcular os primeiros 10 números de Fibonacci
const result = Array.from({ length: 10 }, (_, i) => fibonacci(i));
console.log(result); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,
    },
    {
      language: "typescript",
      title: "Interface TypeScript",
      code: `interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
}

// Implementação da interface
const currentUser: User = {
  id: 1,
  name: 'Miguel Eustáquio',
  email: 'migueladp33@gmail.com',
  role: 'admin',
  createdAt: new Date()
};`,
    },
    {
      language: "python",
      title: "Decorador Python",
      code: `import time
from functools import wraps

def measure_time(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} levou {end_time - start_time:.4f} segundos para executar")
        return result
    return wrapper

@measure_time
def process_data(data):
    # Simulando processamento
    time.sleep(1)
    return data.upper()

result = process_data("hello world")`,
    },
    {
      language: "java",
      title: "API REST com Spring Boot",
      code: `@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.save(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}`,
    },
  ])

  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0)

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentSnippetIndex((prev) => (prev + 1) % codeSnippets.length)
      }, 10000)

      return () => clearInterval(interval)
    }
  }, [isOpen, codeSnippets.length])

  const currentSnippet = codeSnippets[currentSnippetIndex]

  return (
    <>
      {!isOpen && (
        <motion.button
          className={cn(
            "fixed top-24 right-6 z-40 p-3 rounded-full bg-background border border-primary shadow-lg",
            className,
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
        >
          <Code className="text-primary" />
        </motion.button>
      )}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed top-24 right-6 z-40 w-[90vw] max-w-md bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden"
        >
          {/* Barra de título */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Code size={16} className="text-blue-400" />
              <span className="text-sm font-mono text-gray-300">{currentSnippet.title}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-900 text-blue-200">{currentSnippet.language}</span>
            </div>
            <button className="p-1 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>
              <X size={14} className="text-gray-400" />
            </button>
          </div>

          {/* Código */}
          <div className="p-4 max-h-[60vh] overflow-y-auto font-mono text-sm bg-gray-950 text-gray-300">
            <pre className="whitespace-pre-wrap">{currentSnippet.code}</pre>
          </div>

          {/* Navegação */}
          <div className="flex justify-center p-2 bg-gray-800 border-t border-gray-700">
            {codeSnippets.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 mx-1 rounded-full",
                  index === currentSnippetIndex ? "bg-blue-500" : "bg-gray-600",
                )}
                onClick={() => setCurrentSnippetIndex(index)}
              />
            ))}
          </div>
        </motion.div>
      )}
    </>
  )
}
