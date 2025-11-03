import { useEffect } from "react";
const DEFAULT_TITLE = "BizSpace";

export function DocumentTitle(title) {
  useEffect(() => {
    const newTitle = title ? `BizSpace | ${title} ` : DEFAULT_TITLE;
    document.title = newTitle;

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
}
