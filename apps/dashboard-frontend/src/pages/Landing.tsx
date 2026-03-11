import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Zap,
  Globe,
  Shield,
  BarChart3,
  Code2,
  Layers,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "200+ Models",
    description:
      "Access GPT-4, Claude, Llama, Gemini, and hundreds more through a single endpoint.",
  },
  {
    icon: Layers,
    title: "Unified API",
    description:
      "One integration, every model. Switch providers without changing your code.",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description:
      "Track spending, monitor usage, and optimize costs across all your API keys.",
  },
  {
    icon: Shield,
    title: "Enterprise Ready",
    description:
      "SOC 2 compliant infrastructure with 99.9% uptime and global edge routing.",
  },
  {
    icon: Code2,
    title: "Developer First",
    description:
      "OpenAI-compatible API. Drop-in replacement — just change the base URL.",
  },
  {
    icon: Zap,
    title: "Instant Routing",
    description:
      "Automatic failover and smart routing finds the fastest, cheapest provider.",
  },
];

export function Landing() {
  const modelsQuery = useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const res = await api.get("/models");
      return res.data;
    },
  });

  const modelCount = modelsQuery.data?.models?.length ?? 200;

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 border border-primary/20">
              <Zap className="size-3.5 text-primary" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              OpenRouter
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/signin">Sign in</Link>
            </Button>

            <Button size="sm" asChild>
              <Link to="/signup">
                Get started
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-24 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs mb-8">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {modelCount}+ models available
          </div>

          <h1 className="text-6xl font-bold max-w-4xl mx-auto">
            One API for every AI model
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Route to the best models from OpenAI, Anthropic, Google, Meta, and
            more.
          </p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <Button size="lg" asChild>
              <Link to="/signup">
                Start building
                <ArrowRight />
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link to="/dashboard">View dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-xl border p-6">
              <feature.icon className="size-6 mb-4" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Models */}
      {modelsQuery.data?.models && (
        <section className="py-24 border-t">
          <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modelsQuery.data.models.slice(0, 9).map((model: any) => (
              <div
                key={model.id}
                className="flex gap-3 border rounded-lg px-4 py-3"
              >
                <div className="size-8 rounded bg-primary/10 flex items-center justify-center text-xs">
                  {model.company.name.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-medium">{model.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {model.company.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
