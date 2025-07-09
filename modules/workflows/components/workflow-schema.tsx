import { description } from "@/features/analytics/components/bar-graph";
import { z } from "zod";

// Validation schema with Zod
export const formSchema = z.object({
    name: z.string().min(1, "Name can't be empty"),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
});