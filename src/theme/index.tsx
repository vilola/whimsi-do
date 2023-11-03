import { extendTheme } from "@chakra-ui/react";

import { listTheme } from "./components";

export const theme = extendTheme({
    components: { List: listTheme },
    fonts: {
      heading: `'Open Sans', sans-serif`,
      body: `'Raleway', sans-serif`,
    },
});