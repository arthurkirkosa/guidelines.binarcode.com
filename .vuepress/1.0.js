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
    ])
  },
];

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`);
}
