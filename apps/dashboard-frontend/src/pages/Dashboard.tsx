import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

import { Key, Coins, Loader2, Plus, ArrowRight, Layers } from "lucide-react";

export  function Dashboard() {
  const apiKeysQuery = useQuery({
    queryKey: ["api-keys"],
    queryFn: async () => {
      const res = await api.get("/api");
      return res.data;
    },
  });

  const modelsQuery = useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const res = await api.get("/models");
      return res.data;
    },
  });

  const apiKeys = apiKeysQuery.data?.apiKeys ?? [];

  const activeKeys = apiKeys.filter((k: any) => !k.disabled);

  const totalCreditsUsed = apiKeys.reduce(
    (sum: number, k: any) => sum + (k.credisConsumed ?? 0),
    0,
  );

  const modelCount = modelsQuery.data?.models?.length ?? 0;

  const isLoading = apiKeysQuery.isLoading;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Overview of your OpenRouter account
          </p>
        </div>

        {/* Stats */}
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground text-sm py-8">
            <Loader2 className="size-4 animate-spin" />
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Active Keys */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Active API Keys
                  </span>
                  <Key className="size-4 text-muted-foreground/60" />
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-3xl font-bold tracking-tight">
                  {activeKeys.length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {apiKeys.length} total
                </p>
              </CardContent>
            </Card>

            {/* Credits */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Credits Used
                  </span>
                  <Coins className="size-4 text-muted-foreground/60" />
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-3xl font-bold tracking-tight">
                  {totalCreditsUsed.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  across all keys
                </p>
              </CardContent>
            </Card>

            {/* Models */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Available Models
                  </span>
                  <Layers className="size-4 text-muted-foreground/60" />
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-3xl font-bold tracking-tight">
                  {modelCount}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  from all providers
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="bg-card/30 border-border/40 hover:border-border/70 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="size-10 rounded-lg bg-primary/5 border border-border/50 flex items-center justify-center mb-3">
                    <Plus className="size-5 text-muted-foreground" />
                  </div>

                  <h3 className="font-semibold text-sm">Create API Key</h3>

                  <p className="text-xs text-muted-foreground mt-1">
                    Generate a new key to start making requests.
                  </p>
                </div>

                <Button variant="outline" size="sm" asChild>
                  <Link to="/api-keys">
                    Go
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/30 border-border/40 hover:border-border/70 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="size-10 rounded-lg bg-primary/5 border border-border/50 flex items-center justify-center mb-3">
                    <Coins className="size-5 text-muted-foreground" />
                  </div>

                  <h3 className="font-semibold text-sm">Add Credits</h3>

                  <p className="text-xs text-muted-foreground mt-1">
                    Top up your balance to keep making requests.
                  </p>
                </div>

                <Button variant="outline" size="sm" asChild>
                  <Link to="/credits">
                    Go
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
