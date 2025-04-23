import Link from "next/link"
import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from "lucide-react"
import { Section } from "@/components/section"
import { SectionTitle } from "@/components/section-title"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import { Contact3D } from "@/components/contact-3d"

export const metadata = {
  title: "Contato | Miguel Eustáquio",
  description: "Entre em contato com Miguel Eustáquio, desenvolvedor Full Stack com foco em back-end.",
}

export default function ContatoPage() {
  return (
    <div className="pt-16">
      <Section>
        <SectionTitle title="Entre em Contato" subtitle="Tem alguma pergunta ou proposta? Entre em contato comigo" />

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="space-y-8">
                <h3 className="text-2xl font-bold">Informações de Contato</h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <span>migueladp33@gmail.com</span>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <span>(34) 99220-8736</span>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <span>Brasil</span>
                  </div>
                </div>

                <div className="pt-6">
                  <h4 className="text-lg font-semibold mb-4">Me encontre nas redes sociais</h4>

                  <div className="flex flex-wrap gap-4">
                    <Button asChild variant="outline" className="flex items-center gap-2">
                      <Link href="https://github.com/NotDiasz" target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
                        <span>GitHub</span>
                      </Link>
                    </Button>

                    <Button asChild variant="outline" className="flex items-center gap-2">
                      <Link
                        href="https://www.linkedin.com/in/miguel-eustaquio-77405b326"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span>LinkedIn</span>
                      </Link>
                    </Button>

                    <Button asChild variant="outline" className="flex items-center gap-2">
                      <Link href="https://www.instagram.com/migueldiasc_" target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-5 w-5" />
                        <span>Instagram</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300} animation="zoom-in">
              <div className="bg-card border rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-center">Conecte-se comigo</h3>
                <Contact3D />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </Section>
    </div>
  )
}
