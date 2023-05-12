import z from "zod";

const defaultEmpty = (val: string) => {
  if (val.length > 0) return val;
  return "Empty";
};

export const validator = z.object({
  name: z.string(),
  age: z.preprocess(
    (val) => parseInt(z.string().parse(val), 10),
    z.number().positive()
  ),
  country: z.string().transform(defaultEmpty),
  discord: z.string(),
  inGameName: z.string(),
  classAndSpec: z.string(),
  uiScreenshot: z
    .any()
    .transform(async (val) => new Blob([await (val as File).arrayBuffer()])),
  joinReason: z.string().transform(defaultEmpty),
  experience: z.string().transform(defaultEmpty),
  notes: z.string().transform(defaultEmpty),
  willingToPlayAnotherClass: z
    .enum(["on", "off"])
    .optional()
    .transform((val) => {
      if (val) return val === "on" ? "Yes" : "No";
      return "No";
    }),
  willingToPlayAnotherClassNotes: z.string().transform(defaultEmpty),
  attendRaidDaysNotes: z.string().transform(defaultEmpty),
});

export type Application = z.infer<typeof validator>;
