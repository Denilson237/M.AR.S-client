import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(1, "Name can't be empty"),
    description: z.string().optional(),
    permissionsId: z.array(z.string()).optional(),
});