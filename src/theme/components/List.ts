import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { listAnatomy as parts } from "@chakra-ui/anatomy";
import { mode } from "@chakra-ui/theme-tools";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const custom = definePartsStyle((props) => ({
  container: {
    shadow: "none",
    display: "flex",
    flexDirection: "column",
    justify: "center",
    align: "center",
  },
  item: {
    background: mode("gray.50", "blackAlpha.100")(props),
    padding: 5,
    shadow: "sm",
    borderRadius: "md",
  },
}));

export const listTheme = defineMultiStyleConfig({
  variants: {
    custom,
  },
});
