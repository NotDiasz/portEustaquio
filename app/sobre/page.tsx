import { Section } from "@/components/section"
import { SectionTitle } from "@/components/section-title"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedImage } from "@/components/animated-image"

export const metadata = {
  title: "Sobre | Miguel Eustáquio",
  description: "Conheça mais sobre Miguel Eustáquio, desenvolvedor Full Stack.",
}

export default function SobrePage() {
  return (
    <div className="pt-16">
      <Section>
        <SectionTitle title="Sobre Mim" subtitle="Conheça mais sobre minha jornada e experiência profissional" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden border-4 border-primary/20 shadow-xl">
              <AnimatedImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eu2.jpg-8zzXJNuJbQP333uqSZl6xmfstzY5yy.jpeg"
                alt="Miguel Eustáquio"
                fill
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200} className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Miguel Eustáquio</h3>
              <p className="text-muted-foreground">Desenvolvedor Full Stack</p>
            </div>

            <p>
              Sou um desenvolvedor Full Stack com foco em back-end, apaixonado por criar APIs robustas e escaláveis.
              Atualmente cursando Análise e Desenvolvimento de Sistemas na Uniube, com previsão de conclusão para 2026.
            </p>

            <p>
              Busco posição como Desenvolvedor Back-end ou Full-stack para aplicar conhecimentos em Node.js, Python,
              Java, Spring Boot, BunJs, e bancos de dados, criando APIs e aplicações escaláveis e seguras. Tenho
              experiência com SQL Server, MySQL, NoSQL, MongoDB, APIs REST, RESTFULL e WebSockets. No front-end, utilizo
              JavaScript, TypeScript, React e TailwindCSS para interfaces responsivas.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Contato:</h4>
                <ul className="space-y-1 text-sm">
                  <li>Email: migueladp33@gmail.com</li>
                  <li>Telefone: (34) 99220-8736</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Idiomas:</h4>
                <ul className="space-y-1 text-sm">
                  <li>Português (nativo)</li>
                  <li>Inglês (básico)</li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      <Section className="bg-muted/50">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Formação Acadêmica</h3>

            <div className="bg-card border rounded-lg p-6 mb-8">
              <h4 className="text-xl font-semibold mb-2">Análise e Desenvolvimento de Sistemas (ADS)</h4>
              <p className="text-muted-foreground mb-1">Uniube</p>
              <p className="text-sm text-muted-foreground">Conclusão prevista para 2026</p>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-center">Certificações</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card border rounded-lg p-4">
                <h4 className="font-semibold">Git</h4>
                <p className="text-sm text-muted-foreground">Udemy</p>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <h4 className="font-semibold">Fullstack Developer</h4>
                <p className="text-sm text-muted-foreground">RocketSeat</p>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <h4 className="font-semibold">UI/UX</h4>
                <p className="text-sm text-muted-foreground">Udemy</p>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <h4 className="font-semibold">UI Figma</h4>
                <p className="text-sm text-muted-foreground">Udemy</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      <Section>
        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Experiência Profissional</h3>

            <div className="bg-card border rounded-lg p-6 mb-6">
              <h4 className="text-xl font-semibold mb-2">Desenvolvedor Freelancer</h4>
              <p className="text-muted-foreground mb-4">Projetos Independentes</p>
              <p className="mb-4">
                Desenvolvimento de 3 projetos de websites institucionais utilizando React, TypeScript, Tailwind e
                Node.js.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h4 className="text-xl font-semibold mb-2">Desenvolvedor</h4>
              <p className="text-muted-foreground mb-4">FinTech VagasLivre - 3 meses</p>
              <p>Desenvolvimento e manutenção de aplicações web utilizando tecnologias modernas.</p>
            </div>
          </div>
        </AnimatedSection>
      </Section>
    </div>
  )
}
