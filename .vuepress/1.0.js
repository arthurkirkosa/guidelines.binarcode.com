module.exports = [
  {
    title: "Getting Started",
    collapsable: false,
    children: ["frontend-setup"]
  },
  {
    title: "Workflows",
    collapsable: true,
    children: prefix("workflow", [
      "",
      "frontend-setup",
      "laravel-api-setup",
      "dev-api-ci-setup",
      "code-review",
    ])
  },
  {
    title: "Guidelines",
    collapsable: true,
    children: prefix("guidelines", [
      "",
      "vue",
    ])
  },
  {
    title: "Procedures",
    collapsable: true,
    children: prefix("procedures", [
      "",
      "setup-new-project",
    ])
  },
  {
    title: "Hints",
    collapsable: true,
    children: prefix("hints", [
      "",
      "host-command",
    ])
  },
];

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`);
}
