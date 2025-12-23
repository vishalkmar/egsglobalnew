// Minimal `cn` helper (classNames-like) used across UI components
export function cn(...args) {
  const classes = [];

  args.forEach((arg) => {
    if (!arg) return;
    const type = typeof arg;
    if (type === "string" || type === "number") {
      classes.push(String(arg));
      return;
    }
    if (Array.isArray(arg)) {
      classes.push(cn(...arg));
      return;
    }
    if (type === "object") {
      Object.keys(arg).forEach((key) => {
        if (arg[key]) classes.push(key);
      });
      return;
    }
  });

  return classes.join(" ");
}

export default cn;
