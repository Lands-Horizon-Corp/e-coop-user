Move modules from `libs/modules` into each domain's `src` folder under `libs/domains`.

Usage

- Dry run (default):

    node tools/move-modules-to-domains.cjs

- Apply planned moves:

    node tools/move-modules-to-domains.cjs --apply

- Move by regex pattern into a specific domain:

    node tools/move-modules-to-domains.cjs --pattern="^member-" --to=member-crm --apply

Notes

- The script uses the mapping defined inside the file to determine domain targets.
- Each module is moved to `libs/domains/<domain>/src/<module>`.
- If a module folder from `libs/modules` doesn't exist it will be skipped.
- Always run without `--apply` first to verify planned moves.
