import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type Pilot, type InsertPilot } from "@shared/routes";

export function usePilots() {
  return useQuery({
    queryKey: [api.pilots.list.path],
    queryFn: async () => {
      const res = await fetch(api.pilots.list.path);
      if (!res.ok) throw new Error("Failed to fetch personnel data");
      return api.pilots.list.responses[200].parse(await res.json());
    },
  });
}

export function usePilot(id: number) {
  return useQuery({
    queryKey: [api.pilots.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.pilots.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch pilot dossier");
      return api.pilots.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useUpdatePilot() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & Partial<InsertPilot>) => {
      const url = buildUrl(api.pilots.update.path, { id });
      const res = await fetch(url, {
        method: api.pilots.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update personnel record");
      return api.pilots.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.pilots.list.path] });
    },
  });
}
