import { Section } from "@/components/section"
import { SectionTitle } from "@/components/section-title"
import { ProjectCard } from "@/components/project-card"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedBackground } from "@/components/animated-background"

export const metadata = {
  title: "Projetos | Miguel Eustáquio",
  description: "Conheça os projetos desenvolvidos por Miguel Eustáquio.",
}

export default function ProjetosPage() {
  return (
    <div className="pt-16 relative">
      <AnimatedBackground />

      <Section>
        <SectionTitle title="Meus Projetos" subtitle="Conheça alguns dos projetos que desenvolvi" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatedSection delay={100} animation="fade-up">
            <ProjectCard
              title="CRUD API"
              description="API RESTful para gerenciamento de usuários e pessoas, incluindo autenticação e relacionamento entre tabelas. Oferece operações completas de CRUD com segurança e testes."
              tags={["Node.js", "Express", "JWT", "REST API", "Testes"]}
              url="https://github.com/NotDiasz/CRUDApi"
              urlType="github"
            />
          </AnimatedSection>

          <AnimatedSection delay={200} animation="fade-up">
            <ProjectCard
              title="Task List Python"
              description="Um Task List Inteligente desenvolvido em Python para gerenciamento de tarefas, permitindo adicionar, marcar como concluídas e organizar suas atividades."
              tags={["Python", "CLI", "Gerenciamento de Tarefas"]}
              url="https://github.com/NotDiasz/Projeto-Python"
              urlType="github"
            />
          </AnimatedSection>

          <AnimatedSection delay={300} animation="fade-up">
            <ProjectCard
              title="Curso de Node.js"
              description="Projeto desenvolvido durante curso de Node.js, explorando fundamentos, APIs, autenticação e boas práticas de desenvolvimento backend."
              tags={["Node.js", "Express", "JavaScript", "Backend"]}
              url="https://github.com/NotDiasz/Course-Node.Js"
              urlType="github"
            />
          </AnimatedSection>

          <AnimatedSection delay={400} animation="slide-in-right">
            <ProjectCard
              title="Void Studio - Soluções Web"
              description="Site institucional para estúdio de desenvolvimento web, apresentando serviços, portfólio e informações de contato."
              tags={["HTML", "CSS", "JavaScript", "Responsivo"]}
              url="https://void-studio.netlify.app/"
              urlType="site"
            />
          </AnimatedSection>

          <AnimatedSection delay={500} animation="slide-in-right">
            <ProjectCard
              title="Gooday - App Fitness"
              description="Protótipo de uma rede social fitness para comunidade, desenvolvido no Figma. Permite compartilhar treinos, progressos e conectar com outros entusiastas."
              tags={["UI/UX", "Figma", "Design", "Mobile App"]}
              url="https://www.figma.com/design/0DE5kvaLPWGeDB7kr8G6KB/Projeto-Gooday-by-Diasz?node-id=0-1&t=pYee3NsENOOiUBIW-1"
              urlType="figma"
            />
          </AnimatedSection>
        </div>
      </Section>
    </div>
  )
}
