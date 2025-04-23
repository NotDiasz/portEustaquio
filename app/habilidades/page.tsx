"use client"

import {
  Code,
  Database,
  Server,
  Globe,
  Cpu,
  GitBranch,
  Cloud,
  Terminal,
  Layout,
  Layers,
  Workflow,
  Users,
  MessageSquare,
  GitPullRequest,
  Clock,
  Trello,
  FileText,
} from "lucide-react"
import { Section } from "@/components/section"
import { SectionTitle } from "@/components/section-title"
import { AnimatedSection } from "@/components/animated-section"
import { SkillCard } from "@/components/skill-card"
import { CodeSnippet } from "@/components/code-snippet"
import { useEffect } from "react"
import { motion } from "framer-motion"

export default function HabilidadesPage() {
  // Metadata precisa ser removido do componente cliente
  useEffect(() => {
    // Definir o título da página dinamicamente
    document.title = "Habilidades | Miguel Eustáquio"
  }, [])

  const codeExamples = {
    javascript: `// Exemplo de API REST com Express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware de autenticação
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Não autorizado' });
  // Verificar token...
  next();
};

// Rotas
app.get('/api/users', authenticate, (req, res) => {
  res.json([
    { id: 1, name: 'Miguel' },
    { id: 2, name: 'João' }
  ]);
});

app.listen(PORT, () => console.log(\`Servidor rodando na porta \${PORT}\`));`,

    typescript: `// Interface para tipagem de usuário
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Classe de serviço com TypeScript
class UserService {
  private users: User[] = [];

  constructor() {
    console.log('Serviço de usuários inicializado');
  }

  public getAll(): User[] {
    return this.users;
  }

  public getById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  public create(user: Omit<User, 'id'>): User {
    const newUser = {
      ...user,
      id: Date.now()
    };
    this.users.push(newUser);
    return newUser;
  }
}

// Uso
const userService = new UserService();
const newUser = userService.create({
  name: 'Miguel',
  email: 'miguel@example.com',
  role: 'admin'
});
console.log(newUser);`,

    python: `# Exemplo de API com FastAPI
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="API de Usuários")

# Modelo de dados
class User(BaseModel):
    id: Optional[int] = None
    name: str
    email: str
    active: bool = True

# Banco de dados simulado
users_db = []
user_id_counter = 1

# Rotas
@app.post("/users/", response_model=User)
def create_user(user: User):
    global user_id_counter
    user.id = user_id_counter
    user_id_counter += 1
    users_db.append(user)
    return user

@app.get("/users/", response_model=List[User])
def read_users(skip: int = 0, limit: int = 10):
    return users_db[skip : skip + limit]

@app.get("/users/{user_id}", response_model=User)
def read_user(user_id: int):
    for user in users_db:
        if user.id == user_id:
            return user
    raise HTTPException(status_code=404, detail="Usuário não encontrado")

# Executar com: uvicorn main:app --reload`,
  }

  return (
    <div className="pt-16">
      <Section>
        <SectionTitle
          title="Minhas Habilidades"
          subtitle="Conheça as tecnologias e ferramentas que utilizo no desenvolvimento de projetos"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatedSection delay={100} animation="fade-up">
            <SkillCard
              icon={Code}
              title="Linguagens de Programação"
              description="Python, JavaScript, TypeScript, C, Java"
            />
          </AnimatedSection>

          <AnimatedSection delay={200} animation="fade-up">
            <SkillCard
              icon={Layers}
              title="Frameworks"
              description="Node.js, Express.js, React, Spring Boot, Bun.js, bcrypt, Tailwind CSS, Jest, Sequelize.js"
            />
          </AnimatedSection>

          <AnimatedSection delay={300} animation="fade-up">
            <SkillCard icon={Database} title="Bancos de Dados" description="MongoDB, MySQL, SQL Server, Oracle" />
          </AnimatedSection>

          <AnimatedSection delay={400} animation="slide-in-right">
            <SkillCard
              icon={GitBranch}
              title="Ferramentas"
              description="Git, GitHub, Scrum, Kanban, Bitrix24, Postman"
            />
          </AnimatedSection>

          <AnimatedSection delay={500} animation="slide-in-right">
            <SkillCard icon={Workflow} title="Metodologias" description="TDD, BDD, DDD, Scrum, Kanban" />
          </AnimatedSection>

          <AnimatedSection delay={600} animation="slide-in-right">
            <SkillCard icon={Terminal} title="Outros Conhecimentos" description="Docker, XAMPP, Pandas, Path" />
          </AnimatedSection>

          <AnimatedSection delay={700} animation="zoom-in">
            <SkillCard icon={Cloud} title="Cloud" description="AWS Básico (EC2, Lightsail)" />
          </AnimatedSection>

          <AnimatedSection delay={800} animation="zoom-in">
            <SkillCard icon={Layout} title="UI/UX" description="Design de interfaces, Figma, Prototipagem" />
          </AnimatedSection>

          <AnimatedSection delay={900} animation="zoom-in">
            <SkillCard icon={Server} title="Back-end" description="APIs REST, RESTful, WebSockets, Autenticação" />
          </AnimatedSection>
        </div>
      </Section>

      <Section className="bg-muted/50">
        <SectionTitle title="Exemplos de Código" subtitle="Demonstrações de código nas linguagens que utilizo" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatedSection delay={100}>
            <CodeSnippet code={codeExamples.javascript} language="javascript" title="API REST com Express.js" />
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <CodeSnippet code={codeExamples.typescript} language="typescript" title="Serviço com TypeScript" />
          </AnimatedSection>

          <AnimatedSection delay={500} className="lg:col-span-2">
            <CodeSnippet code={codeExamples.python} language="python" title="API com FastAPI (Python)" />
          </AnimatedSection>
        </div>

        <motion.div
          className="mt-12 p-6 bg-gray-800/50 border border-gray-700 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <h3 className="text-xl font-mono mb-4 text-green-400">$ whoami</h3>
          <div className="font-mono text-sm text-gray-300">
            <p className="mb-2">Desenvolvedor apaixonado por criar soluções elegantes para problemas complexos.</p>
            <p className="mb-2">
              Especializado em desenvolvimento back-end e APIs, com foco em performance e segurança.
            </p>
            <p>Sempre em busca de aprender novas tecnologias e aprimorar minhas habilidades.</p>
          </div>
        </motion.div>
      </Section>

      <Section className="bg-muted/50">
        <SectionTitle
          title="Competências para Trabalho em Equipe"
          subtitle="Habilidades essenciais para colaboração e desenvolvimento em equipe"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatedSection delay={100} animation="bounce">
            <SkillCard
              icon={Users}
              title="Colaboração"
              description="Capacidade de trabalhar efetivamente em equipes multidisciplinares e contribuir para objetivos comuns"
            />
          </AnimatedSection>

          <AnimatedSection delay={200} animation="bounce">
            <SkillCard
              icon={Workflow}
              title="Metodologias Ágeis"
              description="Experiência com Scrum, Kanban e outras metodologias ágeis para desenvolvimento iterativo"
            />
          </AnimatedSection>

          <AnimatedSection delay={300} animation="bounce">
            <SkillCard
              icon={Globe}
              title="Comunicação"
              description="Boa comunicação verbal e escrita para interação com clientes e equipe"
            />
          </AnimatedSection>

          <AnimatedSection delay={400} animation="fade-in">
            <SkillCard
              icon={GitPullRequest}
              title="Controle de Versão"
              description="Experiência com Git Flow, Pull Requests, Code Reviews e boas práticas de versionamento"
            />
          </AnimatedSection>

          <AnimatedSection delay={500} animation="fade-in">
            <SkillCard
              icon={MessageSquare}
              title="Feedback Construtivo"
              description="Capacidade de dar e receber feedback de forma construtiva para melhorar a qualidade do código"
            />
          </AnimatedSection>

          <AnimatedSection delay={600} animation="fade-in">
            <SkillCard
              icon={Clock}
              title="Gestão de Tempo"
              description="Habilidade para gerenciar prazos, priorizar tarefas e entregar resultados dentro do cronograma"
            />
          </AnimatedSection>

          <AnimatedSection delay={700} animation="slide-in-right">
            <SkillCard
              icon={Trello}
              title="Ferramentas de Colaboração"
              description="Experiência com Jira, Trello, Slack e outras ferramentas para gestão de projetos e comunicação"
            />
          </AnimatedSection>

          <AnimatedSection delay={800} animation="slide-in-right">
            <SkillCard
              icon={FileText}
              title="Documentação"
              description="Capacidade de criar documentação clara e útil para código, APIs e processos"
            />
          </AnimatedSection>
        </div>
      </Section>

      <Section>
        <SectionTitle
          title="Competências Técnicas"
          subtitle="Além das habilidades técnicas, possuo diversas competências que complementam meu perfil profissional"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatedSection delay={100} animation="fade-up">
            <SkillCard
              icon={Cpu}
              title="Redes"
              description="Conhecimentos básicos em redes de computadores e infraestrutura"
            />
          </AnimatedSection>

          <AnimatedSection delay={200} animation="fade-up">
            <SkillCard
              icon={Terminal}
              title="Resolução de Problemas"
              description="Capacidade analítica para identificar e resolver problemas complexos"
            />
          </AnimatedSection>

          <AnimatedSection delay={300} animation="fade-up">
            <SkillCard
              icon={Layers}
              title="Habilidades Empresariais"
              description="Compreensão de processos de negócio e requisitos empresariais"
            />
          </AnimatedSection>
        </div>
      </Section>
    </div>
  )
}
