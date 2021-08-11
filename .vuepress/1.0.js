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
      "test-procedures",
    ])
  },
  {
    title: "Hints",
    collapsable: true,
    children: prefix("hints", [
      "",
      "host-command",
      "resize-forge-ubuntu",
    ])
  },
];

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`);
}
