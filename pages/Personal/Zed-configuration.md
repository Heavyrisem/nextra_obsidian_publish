---
nextra-publish: true
---
```json
// Zed settings
//
// For information on how to configure Zed, see the Zed
// documentation: https://zed.dev/docs/configuring-zed
//
// To see all of Zed's default settings without changing your
// custom settings, run the `open default settings` command
// from the command palette or from `Zed` application menu.
{
  "assistant": {
    "default_model": {
      "provider": "copilot_chat",
      "model": "gpt-4o"
    },
    "enable_experimental_live_diffs": true,
    "version": "2"
  },
  "features": {
    "edit_prediction_provider": "copilot",
    "copilot": true
  },
  "theme": "Catppuccin Mocha",
  "ui_font_size": 14,
  "buffer_font_size": 12,
  "languages": {
    "TypeScript": {
      "code_actions_on_format": {
        "source.fixAll.eslint": true
      }
    },
    "TSX": {
      "code_actions_on_format": {
        "source.fixAll.eslint": true
      }
    },
    "JavaScript": {
      "code_actions_on_format": {
        "source.fixAll.eslint": true
      }
    }
  },
  "project_panel": {
    "auto_fold_dirs": false
  },
  "tabs": {
    "git_status": true
  },
  "tab_bar": {
    "show_nav_history_buttons": false
  }
}


```


```json
[
  {
    "context": "Editor",
    "bindings": {
      "alt-up": "editor::MoveLineUp",
      "alt-down": "editor::MoveLineDown",
      "cmd-alt-up": "editor::SelectLargerSyntaxNode",
      "cmd-alt-down": "editor::SelectSmallerSyntaxNode",
    }
  }
]

```