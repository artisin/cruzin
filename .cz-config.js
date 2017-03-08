
module.exports = {
  types: [
    {value: 'feat',     name: 'feat:     A new feature'},
    {value: 'update',   name: 'update:   Updates feature'},
    {value: 'fix',      name: 'fix:      A bug fix'},
    {value: 'docs',     name: 'docs:     Documentation only changes'},
    {value: 'style',    name: 'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)'},
    {value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature'},
    {value: 'perf',     name: 'perf:     A code change that improves performance'},
    {value: 'test',     name: 'test:     Adding missing tests'},
    {value: 'chore',    name: 'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation'},
    {value: 'revert',   name: 'revert:   Revert to a commit'},
    {value: 'WIP',      name: 'WIP:      Work in progress'},
    {value: 'init',     name: 'init:     Initial commit'}
  ],
  // scopes: {Array of Strings}: Specify the scopes for your particular project.
  // Eg.: for some banking system: ["acccounts", "payments"].
  // For another travelling application: ["bookings", "search", "profile"]
  scopes: [
    {name: 'src'},
    {name: '__internals__'},
    {name: '__tests__'},
    {name: 'root'}
  ],
  // scopeOverrides: {Object where key contains a Array of String}:
  // Use this when you want to override scopes for a specific commit type.
  // Example bellow specify scopes when type is fix:
  scopeOverrides: {},
  // allowCustomScopes: {boolean, default false}: adds the option custom to
  // scope selection so you can still typea scope if you need.
  allowCustomScopes: true,
  // allowBreakingChanges: {Array of Strings: default none}. List of commit
  // types you would like to the question breaking change prompted. Eg.: ['feat', 'fix']
  allowBreakingChanges: ['feat', 'fix']
};
