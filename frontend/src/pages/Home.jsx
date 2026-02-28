import { Button } from '../components/ui/Button'
import { Section } from '../components/layout/Section'
import { ServiceCard } from '../components/marketing/ServiceCard'

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#why-us', label: 'Why us' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

const SERVICES = [
  {
    icon: '🌐',
    title: 'Web development & websites',
    description: 'We build fast, modern websites tailored to your business—from landing pages to full web applications.',
  },
  {
    icon: '📱',
    title: 'Mobile app development',
    description: 'Native and cross-platform Android and iOS apps that deliver a great user experience.',
  },
  {
    icon: '⚙️',
    title: 'Web services & APIs',
    description: 'Reliable backends, integrations, and APIs to power your products and automate workflows.',
  },
  {
    icon: '👥',
    title: 'Client management solutions',
    description: 'Custom tools and dashboards to manage clients, projects, and operations efficiently.',
  },
]

const WHY_US = [
  'Quality code and on-time delivery',
  'Fast turnaround without compromising standards',
  'Dedicated support and clear communication',
  'Custom solutions—no one-size-fits-all',
]

const PROCESS_STEPS = [
  { step: 1, title: 'Discuss', desc: 'We understand your goals, audience, and requirements.' },
  { step: 2, title: 'Plan', desc: 'We propose a clear scope, timeline, and approach.' },
  { step: 3, title: 'Build', desc: 'We develop and test your solution with regular updates.' },
  { step: 4, title: 'Support', desc: 'We hand over and stay available for fixes and improvements.' },
]

export default function Home() {
  return (
    <div className="space-y-0">
      {/* In-page navigation: scroll to sections */}
      <nav
        className="sticky top-14 z-30 -mx-4 px-4 py-3 sm:py-4 bg-background/95 backdrop-blur border-b border-border mb-8 sm:mb-10"
        aria-label="Page sections"
      >
        <div className="container mx-auto max-w-6xl flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/10"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-primary/15 via-background to-primary/5 min-h-[320px] sm:min-h-[380px] md:min-h-[420px] flex items-center justify-center border border-border shadow-lg mb-12 sm:mb-16">
        <div className="relative z-10 text-center px-4 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground max-w-3xl mx-auto leading-tight">
            San Tak Private Limited
          </h1>
          <p className="text-lg sm:text-xl mt-4 max-w-2xl mx-auto text-muted-foreground font-medium">
            Web development, mobile apps, and digital solutions for your business.
          </p>
          <a href="#contact" className="inline-block mt-8 sm:mt-10">
            <Button size="lg" className="shadow-lg shadow-primary/25">
              Get Free Consultation
            </Button>
          </a>
        </div>
      </section>

      {/* Services */}
      <Section id="services" title="Our services" subtitle="What we offer for your next web or mobile project.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </Section>

      {/* Why choose us */}
      <Section
        id="why-us"
        title="Why choose us"
        subtitle="We focus on quality, speed, and a partnership you can rely on."
      >
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto list-none">
          {WHY_US.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border text-foreground font-medium"
            >
              <span className="text-primary text-lg shrink-0" aria-hidden>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* About company */}
      <Section id="about" title="About us" subtitle="Who we are and where to find us.">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            San Tak Pvt. Ltd. is a technology partner helping businesses grow with custom web and mobile solutions.
            We combine clear communication with solid engineering so you get software that works for your goals.
          </p>
          <p className="mt-6 text-foreground font-semibold">
            Alwar city, near Company Garden, Wender Mall, G11
          </p>
        </div>
      </Section>

      {/* Process / How we work */}
      <Section id="process" title="How we work" subtitle="From idea to launch in four clear steps.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 max-w-5xl mx-auto">
          {PROCESS_STEPS.map(({ step, title, desc }) => (
            <div key={step} className="text-center">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto mb-4 shadow-md"
                aria-hidden
              >
                {step}
              </div>
              <h3 className="font-bold text-foreground text-lg">{title}</h3>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact / CTA */}
      <Section id="contact" title="Contact us" subtitle="Call us for your next web or mobile project.">
        <div className="max-w-xl mx-auto">
          <p className="text-center text-muted-foreground mb-6">
            Phone: <a href="tel:+910000000000" className="text-primary font-medium hover:underline">+91 00000 00000</a>
            {' · '}
            Email: <a href="mailto:hello@santak.com" className="text-primary font-medium hover:underline">hello@santak.com</a>
          </p>
          <form
            className="flex flex-col gap-4 p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm"
            onSubmit={(e) => e.preventDefault()}
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-foreground mb-1 block">Name</span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  readOnly
                  aria-readonly
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground mb-1 block">Email</span>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  readOnly
                  aria-readonly
                />
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-medium text-foreground mb-1 block">Message</span>
              <textarea
                placeholder="Tell us about your project..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                readOnly
                aria-readonly
              />
            </label>
            <Button type="submit" size="lg" className="w-full sm:w-auto sm:min-w-[180px]">
              Send message
            </Button>
          </form>
        </div>
      </Section>
    </div>
  )
}
