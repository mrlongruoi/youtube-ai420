## multip command
bun add concurrently

## add package.json
"dev:webhook": "run https webhook",
"dev:all": "concurrently \"bun run dev:webhook\" \"bun run dev\" ",